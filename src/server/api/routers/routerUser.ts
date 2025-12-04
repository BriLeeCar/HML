import { z } from 'zod/v4'
import { createTRPCRouter, publicProcedure } from '.'

export const UserRouter = createTRPCRouter({
	getUserById: publicProcedure.input(z.string().or(z.undefined())).query(async ({ ctx, input }) => {
		return input ?
				await ctx.db.user.findUnique({
					where: {
						id: input,
					},
				})
			:	false
	}),
})
