import { CredentialsSignin } from 'next-auth'
import z from 'zod'
import { hash } from '~/lib/security/hashAndSalt'
import { User, UserKey } from '~/server/api/zod'
import db from '~/server/prisma/db'
import type { CredentialsBase } from './credentials'

const validateSignUpInput = (data: { username: string; password: string; key: string }) => {
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

export const SignUpPath = async (data: CredentialsBase) => {
	const validated = validateSignUpInput(data)
	if (validated) {
		const { username, password, key } = validated

		const query = await db.$transaction(async tx => {
			const userKey = await tx.user.findFirst({
				where: {
					name: {
						equals: username,
						mode: 'insensitive',
					},
					key: key,
				},
				select: {
					id: true,
				},
			})

			if (!userKey) {
				throw new SignUpError('invalid key')
			}

			return await tx.user.update({
				where: { id: userKey.id },
				data: {
					secret: await hash(password),
					key: null,
				},
				include: {
					roles: true,
				},
			})
		})

		if (!query) throw new SignUpError('invalid entry')
		return query
	}
	throw new SignUpError('invalid entry')
}

class SignUpError extends CredentialsSignin {
	message: string
	constructor(message: string) {
		super('')
		this.message = message
	}
}
