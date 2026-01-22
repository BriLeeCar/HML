import 'server-only'

import { generateKey } from '~/lib/security/keyGen'

export const createUserKey = async ({
	input,
	ctx,
}: TRPC.CTX & {
	input: { name: string }
}) => {
	const key = queryCreateUserKey(input.name)

	const newUser = await ctx.db.user.create({
		data: key.data,
		include: {
			roles: {
				include: {
					role: true,
				},
			},
		},
	})

	return newUser
}

const queryCreateUserKey = (name: string) => ({
	data: {
		name: name,
		key: generateKey(),
	},
})
