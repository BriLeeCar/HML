import z from 'zod/v4'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '.'

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
	page: publicProcedure
		.input(z.coerce.number<string>().prefault('0'))
		.query(async ({ ctx, input }) => {
			return await ctx.db.pathway.findMany({
				skip: input,
				take: 15,
				orderBy: {
					countryCode: 'asc',
				},
				include: {
					country: true,
				},
			})
		}),
})
