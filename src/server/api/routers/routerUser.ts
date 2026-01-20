import { z } from 'zod/v4'
import { hash, verify } from '~/lib/index'
import { generateKey } from '~/lib/security/keyGen'
import type { User } from '~/server/prisma/generated'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '.'
import type { tNACTX, tProtectedCTX, tPublicCTX } from './types'
type CTXProps<T extends undefined | 'protected' | null = null> = {
	ctx: T extends undefined ? tNACTX
	: T extends 'protected' ? tProtectedCTX
	: tPublicCTX
}

const getUserRoles = async ({ ctx }: CTXProps) => {
	const userId = ctx.session?.user?.id
	if (!userId) return { roles: [] }
	const roles = await ctx.db.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			roles: {
				select: {
					role: true,
				},
			},
		},
	})

	if (roles && roles.roles.length > 0) {
		const mappedRoles = roles.roles.map(r => r.role.name)
		console.log('Mapped Roles:', mappedRoles)

		return { roles: mappedRoles }
	}

	return { roles: [] }
}

const getCurrent = async ({ ctx }: CTXProps) => {
	const userId = ctx.session?.user
	return (
		userId
		&& (await ctx.db.user.findUnique({
			where: {
				id: userId.id,
			},
			include: {
				roles: {
					include: {
						role: true,
					},
				},
			},
		}))
	)
}

const getUserById = async ({ ctx, input }: CTXProps & { input: string | undefined }) => {
	return input ?
			await ctx.db.user.findUnique({
				where: {
					id: input,
				},
			})
		:	false
}

const createUserKey = async ({
	input,
	ctx,
}: CTXProps<undefined> & {
	input: {
		name: string
	}
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

const getUsers = async ({
	ctx,
	input,
}: CTXProps & {
	input?: number
}) => {
	return await ctx.db.user.findMany({
		skip: input ? (input - 1) * 10 : 0,
		orderBy: {
			key: 'desc',
		},
		include: {
			roles: true,
		},
	})
}

export const UserRouter = createTRPCRouter({
	current: publicProcedure.query(getCurrent),
	getUserById: publicProcedure.input(z.string().or(z.undefined())).query(getUserById),
	createUserKey: protectedProcedure
		.input(z.object({ name: z.string() }))
		.mutation(createUserKey as AnySafe),
	getUserRoles: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.roles.findMany()
	}),
	updateUser: protectedProcedure
		.input(
			z.object({
				updated: z.object({
					name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
					email: z.email('Invalid email address').optional(),
					secret: z.string().min(8, 'Password must be at least 8 characters long').optional(),
				}),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { updated } = input as {
				updated: User
			}

			const updateData = {} as User
			const updatedKeys = Object.keys(updated) as Array<keyof User>

			updatedKeys.forEach(key => {
				if (['id', 'secret'].includes(key) || updated[key] == undefined) return
				Object.assign(updateData, {
					[key]: updated[key],
				})
			})

			const updatedUser = await ctx.db.user.update({
				where: {
					id: ctx.session!.user!.id,
				},
				data: updateData,
			})

			return updatedUser
		}),
	checkSecret: protectedProcedure
		.input(z.object({ secret: z.string(), userId: z.string() }))
		.query(async ({ input, ctx }) => {
			const user = await ctx.db.user.findUnique({
				where: {
					id: input.userId,
				},
			})
			if (user) {
				const isValid = await verify(user.secret, input.secret)
				return isValid
			}
			return false
		}),
	updateSecret: protectedProcedure
		.input(
			z.object({
				newSecret: z.string().min(8, 'Password must be at least 8 characters long'),
				oldSecret: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session?.user?.id
			if (!userId) throw new Error('User not authenticated')
			const enteredOldPassword = await hash(input.oldSecret)
			const newHashedPassword = await hash(input.newSecret)

			const query = await ctx.db.user.update(
				queryUpdatePassword(userId, newHashedPassword, enteredOldPassword)
			)
			if (!query) throw new Error('Old password is incorrect')
		}),
	getUsersRoles: publicProcedure.query(getUserRoles),
	getUsers: publicProcedure.input(z.number().optional()).query(getUsers),
})

const queryUpdatePassword = (userId: string, newPassword: string, oldPassword: string) => ({
	where: {
		id: userId,
		secret: oldPassword,
	},
	data: {
		secret: newPassword,
	},
})

const queryCreateUserKey = (name: string) => ({
	data: {
		name: name,
		key: generateKey(),
	},
})
