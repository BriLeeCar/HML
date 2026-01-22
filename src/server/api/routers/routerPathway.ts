import z from 'zod/v4'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { processPathwayTypes } from './_lib/processPathwayTypes'

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
	getById: publicProcedure.input(z.coerce.number<string>()).query(async ({ ctx, input }) => {
		const pathway = await ctx.db.$transaction(async tx => {
			const pathwayQuery = await tx.pathway.findUnique({
				where: {
					id: input,
				},
				include: {
					country: true,
					categories: {
						include: {
							pathway_categories: true,
						},
					},
					currency: true,
					documents: {
						include: {
							document: true,
						},
					},
					pipelines: true,
					restrictedNationalities: true,
					CMS_User: {
						select: {
							name: true,
							id: true,
						},
					},
				},
			})

			const pathwayTypesQuery = await tx.pathwayTypes.findMany({
				orderBy: [{ parentId: 'asc' }, { name: 'asc' }],
			})

			return { pathway: pathwayQuery, pathwayTypes: processPathwayTypes(pathwayTypesQuery) }
		})

		return pathway
	}),
})
