import z from 'zod/v4'
import type {
	Country,
	CountryCurrency,
	CountryLanguage,
	PathwayPipelines,
	PathwayTypes,
} from '~/server/prisma/generated/browser'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { zCreatePathwayInput } from '../zod'
import { processPathwayTypes } from './_lib/processPathwayTypes'
import { CountryInput } from './routerCountry'

export type CreatePathwayInput = z.infer<typeof zCreatePathwayInput>

export const DataCollectionRouter = createTRPCRouter({
	PathwayInit: protectedProcedure
		.input(
			z.object({
				countries: CountryInput,
			})
		)
		.query(async ({ ctx, input }) => {
			const { select } = input.countries
			const { currencies, languages } = (select || {}) as Record<
				'currencies' | 'languages',
				boolean
			>
				& Record<keyof Country, boolean>

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
					Country & {
						countryCurrencies: CountryCurrency[]
						countryLanguages: CountryLanguage[]
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

				const pathwayTypes = processPathwayTypes(pathwayTypesQuery)

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

		const user = ctx.session.user!

		const pathwayPiplines = Object.keys(piplines)
			.map(k => {
				if (k == 'renewal') return null

				const key = {
					upper: k.toUpperCase(),
					lower: k,
				} as {
					upper: PathwayPipelines
					lower: Exclude<keyof typeof piplines, 'renewal'>
				}

				if (piplines[key.lower] == true) {
					return {
						pipeline: key.upper,
						note: query[key.lower],
					}
				}
				return null
			})
			.filter(p => p != null)

		try {
			const newPathway = await ctx.db.pathway.create({
				data: {
					createdby: user.id,
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
					categories: {
						createMany: {
							data: query.categories.map(catId => {
								return {
									pathwayTypeId: catId,
								}
							}),
							skipDuplicates: true,
						},
					},
					pipelines: {
						createMany: {
							data: pathwayPiplines,
							skipDuplicates: true,
						},
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

type PathwayTypeOmitted = Omit<PathwayTypes, 'parentId'>
export type PathwayTypeRecursive = PathwayTypeOmitted & { children: PathwayTypeRecursive[] }
