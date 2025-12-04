import z from 'zod/v4'
import { createTRPCRouter, protectedProcedure } from '.'

export const PathwayRouter = createTRPCRouter({
	createPathway: protectedProcedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.pathway.create({
				data: {
					...(input as AnySafe),
				},
			})
		}),
})
