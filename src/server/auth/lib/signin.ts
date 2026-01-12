import { CredentialsSignin } from 'next-auth'
import z from 'zod'
import { verify } from '~/lib/security/hashAndSalt'
import { User } from '~/server/api/zod'
import db from '~/server/prisma/db'
import type { CredentialsBase } from './credentials'

export const SignInPath = async (data: CredentialsBase) => {
	const validated = z
		.object({
			username: User.shape.name,
			password: User.shape.secret,
		})
		.safeParse(data)
	if (validated.success) {
		const { username, password } = validated.data
		const returningUser = await db.user.findFirst({
			cacheStrategy: {
				ttl: 300000,
			},
			where: {
				name: username,
			},
			include: {
				roles: true,
			},
		})
		if (returningUser && (await verify(returningUser.secret, password))) {
			return returningUser
		} else {
			throw new SignInError('password')
		}
	}
	throw new SignInError('invalid entry')
}

export class SignInError extends CredentialsSignin {
	code: string
	message: string
	constructor(code: string) {
		super('')
		this.code = code
		this.message = this.getMessage()
	}

	getMessage = () => {
		switch (this.code) {
			case 'password':
				return 'The password you entered is incorrect.'
			case 'key already assigned':
				return 'This key has already been assigned to another user.'
			case 'invalid key':
				return 'The key you entered is invalid.'
			case 'invalid entry':
				return 'Invalid sign in data provided.'
			default:
				return 'An unknown error occurred. Please try again.'
		}
	}
}
