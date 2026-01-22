import { z } from 'zod/v4'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'
import type { User } from '~/server/prisma/generated/browser'
import { createUserKey } from './User/createUserKey.server'

const getUserById = async ({ ctx, input }: TRPC.UnknownCTX & { input: string | undefined }) => {
	return input ?
			await ctx.db.user.findUnique({
				where: {
					id: input,
				},
			})
		:	false
}

const getUsers = async ({
	ctx,
	input,
}: TRPC.UnknownCTX & {
	input?: number
}) => {
	if (!input || input <= 1) {
		input = 0
	}

	const userTx = await ctx.db.$transaction(async tx => {
		const userCount = await tx.user.count({
			where: {
				key: null,
				secret: {
					not: null,
				},
			},
		})

		const totalPages = Math.ceil(userCount / 10)

		const pendingUsers = await tx.user.findMany({
			where: {
				key: {
					not: null,
				},
				secret: null,
			},
			orderBy: {
				name: 'asc',
			},
			include: {
				roles: true,
			},
		})
		const users = await ctx.db.user.findMany({
			where: {
				id: {
					notIn: pendingUsers.map(user => user.id),
				},
			},
			take: 10,
			skip: input ? (input - 1) * 10 : 0,
			orderBy: {
				name: 'asc',
			},
			include: {
				roles: true,
			},
		})

		return { users, pendingUsers, totalPages, userCount }
	})

	return userTx
}

export const UserRouter = createTRPCRouter({
	current: protectedProcedure.query(async ({ ctx }) => {
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
	}),
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
	getUsersRoles: protectedProcedure.query(async ({ ctx }) => {
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
			return { roles: mappedRoles }
		}

		return { roles: [] }
	}),
	getUsers: publicProcedure.input(z.number().optional()).query(getUsers),
})
