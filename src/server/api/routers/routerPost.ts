import z from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const PostRouter = createTRPCRouter({
	getBySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return await ctx.db.post.findUnique({
			where: { slug: input },
			include: {
				author: {
					include: {
						socials: true,
					},
				},
				tags: true,
			},
		})
	}),
})
