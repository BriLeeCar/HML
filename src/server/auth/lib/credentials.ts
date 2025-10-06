import type { UserKey } from "@prisma/client";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { hash, verify } from "~/lib/hashAndSalt";
import { zSignIn, zSignUp, type tSignIn, type tSignUp } from "~/lib/zod";
import { db } from "~/server/db";

const getUserKey = async (key: string) => {
	return await db.userKey.findUnique({
		where: {
			key: key,
		},
		include: {
			user: true,
		},
	});
};

const checkForUserMatch = (enteredName: string, storedName?: string) => {
	return storedName ? enteredName === storedName : true;
};

const checkKeyVaidity = async (
	enteredData: tSignUp,
	userKey: UserKey | null | undefined,
) => {
	if (!userKey) {
		throw new SignInError("invalid key");
	}
	if (!checkForUserMatch(enteredData.username, userKey.name)) {
		throw new SignInError("key already assigned");
	}
	return true;
};

export const CredentialsConfig = Credentials({
	name: "HML",
	type: "credentials",
	credentials: {
		username: {
			label: "Name",
			type: "text",
			placeholder: "Charlotte",
			name: "username",
			required: true,
		},
		password: {
			label: "Password",
			type: "password",
			name: "password",
			required: true,
		},
		key: { label: "Key", type: "password", name: "key" },
	},
	authorize: async (credentials) => {
		if (!credentials) return null;
		if (!credentials.key) {
			return SignInPath(credentials as tSignIn);
		} else {
			return SignUpPath(credentials as tSignUp);
		}
	},
});

const SignUpPath = async (data: tSignUp) => {
	const validated = zSignUp.safeParse(data);
	if (validated.success) {
		const { username, password, key } = validated.data;
		const dbKey = await getUserKey(key);

		if (await checkKeyVaidity(validated.data, dbKey)) {
			if (dbKey?.user) {
				throw new SignInError("key already assigned");
			} else {
				const newUser = await db.user.create({
					data: {
						name: username,
						secret: await hash(password),
						key: {
							connect: {
								key: key,
							},
						},
					},
				});

				if (!newUser) throw new SignInError("invalid entry");

				return newUser;
			}
		}
	}
	throw new Error("Invalid sign up data");
};

const SignInPath = async (data: tSignIn) => {
	const validated = zSignIn.safeParse(data);
	if (validated.success) {
		const { username, password } = validated.data;
		const returningUser = await db.user.findFirst({
			where: {
				name: username,
			},
		});
		if (returningUser && (await verify(returningUser.secret, password))) {
			return returningUser;
		} else {
			throw new SignInError("password");
		}
	}
	throw new SignInError("invalid entry");
};

class SignInError extends CredentialsSignin {
	code: string;
	message: string;
	constructor(code: string) {
		super("");
		this.code = code;
		this.message = this.getMessage();
	}

	getMessage = () => {
		switch (this.code) {
			case "password":
				return "The password you entered is incorrect.";
			case "key already assigned":
				return "This key has already been assigned to another user.";
			case "invalid key":
				return "The key you entered is invalid.";
			case "invalid entry":
				return "Invalid sign in data provided.";
			default:
				return "An unknown error occurred. Please try again.";
		}
	};
}
