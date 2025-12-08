import { z } from 'zod/v4'
import { generateKey } from '~/lib/security/keyGen'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '.'

export const UserRouter = createTRPCRouter({
	current: publicProcedure.query(async ({ ctx }) => {
		const userId = ctx.session?.user
		return (
			userId
			&& (await ctx.db.user.findUnique({
				where: {
					id: userId.id,
				},
			}))
		)
	}),
	getUserById: publicProcedure.input(z.string().or(z.undefined())).query(async ({ ctx, input }) => {
		return input ?
				await ctx.db.user.findUnique({
					where: {
						id: input,
					},
				})
			:	false
	}),
	createUserKey: protectedProcedure
		.input(z.object({ name: z.string(), roleId: z.number().gt(0, 'Invalid Role') }))
		.mutation(async ({ input, ctx }) => {
			const key = generateKey()
			return await ctx.db.userKey.create({
				data: {
					name: input.name,
					key: key,
					roleId: input.roleId,
				},
			})
		}),
	getUserRoles: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.roles.findMany()
	}),
})
