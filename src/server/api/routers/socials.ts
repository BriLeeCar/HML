import z from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const socialMediaRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.social.findMany()
	}),
	getMissing: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			return await ctx.db.social.findMany({
				where: {
					users: {
						none: {
							userId: input,
						},
					},
				},
			})
		}),
})
