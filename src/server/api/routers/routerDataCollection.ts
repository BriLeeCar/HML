import type * as Prisma from '@prisma/client'
import z from 'zod/v4'
import { createTRPCRouter, getCountriesByCode, protectedProcedure } from '.'
import { zCreatePathwayInput } from '../zod'

export type CreatePathwayInput = z.infer<typeof zCreatePathwayInput>

export const DataCollectionRouter = createTRPCRouter({
	PathwayInit: protectedProcedure
		.input(
			z.object({
				countries: getCountriesByCode().input,
			})
		)
		.query(async ({ ctx, input }) => {
			const { select } = input.countries
			const { currencies, languages } = (select || {}) as Record<
				'currencies' | 'languages',
				boolean
			>
				& Record<keyof Prisma.Country, boolean>

			const [countries, documentTypes, pathwayTypes] = await ctx.db.$transaction(async tx => {
				const countries = (await tx.country.findMany({
					include: {
						...(currencies ?
							{
								countryCurrencies: {
									include: {
										currency: true,
									},
								},
							}
						:	{}),
						...(languages ?
							{
								countryLanguages: {
									include: {
										language: true,
									},
								},
							}
						:	{}),
					},
				})) as Array<
					Prisma.Country & {
						countryCurrencies: Prisma.CountryCurrency[]
						countryLanguages: Prisma.CountryLanguage[]
					}
				>

				const documentTypes = await tx.documents.findMany({
					orderBy: { name: 'asc' },
				})
				documentTypes.sort((a, b) =>
					a.name == 'Other' ? 1
					: b.name == 'Other' ? -1
					: a.name.localeCompare(b.name)
				)

				const pathwayTypesQuery = await tx.pathwayTypes.findMany({
					orderBy: [{ parentId: 'asc' }, { name: 'asc' }],
				})

				const getChildren = (parentId: number): PathwayTypeRecursive[] => {
					return pathwayTypesQuery
						.filter(pt => pt.parentId === parentId)
						.map(pt => ({
							...pt,
							children: getChildren(pt.id),
						}))
				}

				const pathwayTypes = pathwayTypesQuery
					.sort((a, b) => {
						if (a.parentId || b.parentId) {
							if (a.parentId && a.parentId == b.id) {
								return 1
							} else if (b.parentId && b.parentId == a.id) {
								return -1
							}
						}
						return (
							a.parentId == null ? -1
							: b.parentId == null ? 1
							: a.parentId - b.parentId
						)
					})
					.reduce((acc, curr) => {
						if (!curr.parentId) {
							acc.push({
								...curr,
								children: getChildren(curr.id),
							})
						}
						return acc
					}, [] as PathwayTypeRecursive[])

				return [countries, documentTypes, pathwayTypes]
			})

			return {
				countries: countries
					.map(c => {
						// @ts-expect-error -- TYPE ISSUE ---
						const currencies = c.countryCurrencies.map(cc => cc.currency)
						// @ts-expect-error -- TYPE ISSUE ---
						const languages = c.countryLanguages.map(cl => cl.language)

						return {
							code: c.code,
							name: c.name,
							currencies: currencies,
							languages: languages,
						}
					})
					.sort((a, b) => a.name.localeCompare(b.name)),
				documentTypes,
				pathwayTypes,
			}
		}),

	CreatePathway: protectedProcedure.input(zCreatePathwayInput).mutation(async ({ ctx, input }) => {
		const { piplines, query } = input

		const user = ctx.session.user

		type PipelineTypes<C extends 'upper' | 'lower'> =
			C extends 'upper' ? Prisma.PathwayPipeline['pipeline'] & Uppercase<keyof Query['query']>
			:	Lowercase<Prisma.PathwayPipeline['pipeline']> & keyof Query['query']

		const createPiplines: Prisma.Prisma.PathwayPipelineCreateOrConnectWithoutPathwayInput[] = (
			Object.entries(piplines) as [PipelineTypes<'lower'>, boolean][]
		)
			.map(([key, value]) => {
				const parsedKey = (key as PipelineTypes<'lower'>).toUpperCase() as PipelineTypes<'upper'>
				return value ?
						({
							create: {
								note: query[key] || '',
								pipeline: parsedKey,
							},
							where: {
								pipeline: parsedKey,
							},
						} as Prisma.Prisma.PathwayPipelineCreateOrConnectWithoutPathwayInput)
					:	null
			})
			.filter(d => d != null)

		try {
			const newPathway = await ctx.db.pathway.create({
				data: {
					createdby: user!.id,
					countryCode: query.countryCode,
					name: query.name,
					createdAt: new Date(),
					description: query.description || '',
					link: query.link || '',
					type: 'VISA',
					currencyCode: query.currencyCode || '',
					restrictions: query.restrictions.map(q => q.note),
					requirements: query.requirements.map(q => q.note),
					limitations: query.limitations.map(q => q.note),
					notes: query.notes.map(q => q.note),
					pipelines: {
						connectOrCreate: createPiplines,
					},
					restrictedNationalities: {
						createMany: {
							data: query.restrictedNationalities.map(rn => ({
								countryCode: rn.countryCode,
								note: rn.note,
							})),
							skipDuplicates: true,
						},
					},
					cost: {
						min: query.cost.min ? Number(query.cost.min) : 0,
						max: query.cost.max ? Number(query.cost.max) : 0,
					},
					processTime: {
						min: query.processTime.min ? Number(query.processTime.min) : 0,
						max: query.processTime.max ? Number(query.processTime.max) : 0,
						note: query.processTime.note || '',
					},
					duration: {
						min: query.duration.min ? Number(query.duration.min) : 0,
						max: query.duration.max ? Number(query.duration.max) : 0,
						note: query.duration.note || '',
					},
					renewal: {
						min: piplines.renewal ? Number(query.renewal?.min) : null,
						max: piplines.renewal ? Number(query.renewal?.max) : null,
						note: query.renewal?.note || '',
					},
					documents: {
						connectOrCreate: query.documents?.map(doc => ({
							create: {
								description: doc.description || null,
								cost: doc.cost || 0,
								link: doc.link || null,
								isRequired: doc.isRequired || false,
								title: doc.title || null,
								document: {
									connect: {
										id: doc.documentId,
									},
								},
							},
							where: {
								id: doc.id,
							},
						})),
					},
				},
			})

			return newPathway
		} catch (error) {
			console.warn('Error creating pathway:', error)
		}
	}),
	Select: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.pathway.findMany()
	}),
})

type PathwayTypeOmitted = Omit<Prisma.PathwayTypes, 'parentId'>
export type PathwayTypeRecursive = PathwayTypeOmitted & { children: PathwayTypeRecursive[] }
