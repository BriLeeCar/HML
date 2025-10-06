import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
	checkForUserKey: publicProcedure
		.input(z.object({ userKey: z.string() }))
		.query(async ({ input, ctx }) => {
			const key = await ctx.db.userKey.findUnique({
				where: { key: input.userKey },
				include: { user: true },
			})

			if (key) {
				return {
					valid: true,
					user:
						key.user ?
							{ id: key.user.id, name: key.user.name }
						:	null,
				}
			}
		}),
	createNewFromKey: publicProcedure
		.input(
			z.object({
				key: z.string(),
				name: z.string().min(2).max(32),
				secret: z.string().min(8).max(64),
			})
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.db.user.create({
				data: {
					name: input.name,
					secret: input.secret,
					key: {
						connect: {
							key: input.key,
						},
					},
				},
			})
		}),
	getAll: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.user.findMany()
	}),
})
