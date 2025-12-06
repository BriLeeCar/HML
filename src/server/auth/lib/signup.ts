import { CredentialsSignin } from 'next-auth'
import z from 'zod'
import { hash } from '~/lib/hashAndSalt'
import { User, UserKey } from '~/server/api/zod'
import db from '~/server/prisma/db'
import type { CredentialsBase } from './credentials'

export const validateSignUpInput = (data: { username: string; password: string; key: string }) => {
	const validated = z
		.object({
			username: User.shape.name.refine(val => val.length > 0, 'username required'),
			password: User.shape.secret.refine(val => {
				return val.length >= 2 && val.length <= 64 && val.trim() != '' && val.indexOf(' ') == -1
			}, 'invalid password'),
			key: UserKey.shape.key,
		})
		.safeParse(data)

	if (validated.success) {
		return validated.data
	} else {
		throw new SignUpError(validated.error.issues[0].message)
	}
}

const checkForUserMatch = (enteredName: string, storedName?: string) => {
	return storedName ? enteredName.toLowerCase() === storedName.toLowerCase() : true
}

export const checkKeyVaidity = (enteredName: string, storedName: string) => {
	if (!checkForUserMatch(enteredName, storedName)) {
		throw new SignUpError('key already assigned')
	}
	return true
}

const getUserKey = async (key: string) => {
	const user = await db.userKey.findUnique({
		where: {
			key: key,
		},
	})

	if (!user) throw new SignUpError('invalid key')

	if (!user.name) throw new SignUpError('key is not assigned to a name')

	if (user.userId) throw new SignUpError('key already assigned')

	return user
}

export const SignUpPath = async (data: CredentialsBase) => {
	const validated = validateSignUpInput(data)
	if (validated) {
		const { username, password, key } = validated
		const dbKey = await getUserKey(key)
		const validatedKey = checkKeyVaidity(validated.username, dbKey.name)

		if (validatedKey) {
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
			})
			if (!newUser) throw new SignUpError('invalid entry')
			return newUser
		}
	}
	throw new SignUpError('invalid entry')
}

export class SignUpError extends CredentialsSignin {
	message: string
	constructor(message: string) {
		super('')
		this.message = message
	}
}
