import type * as Prisma from '@prisma/client'
import z from 'zod/v4'
import { createTRPCRouter, getCountriesByCode, protectedProcedure } from '.'

const zCreatePathwayInput = z
	.object({
		counters: z.object({
			notes: z.number(),
			limitations: z.number(),
			requirements: z.number(),
			restrictions: z.number(),
			documents: z.number(),
		}),
		date: z.date(),
		durations: z.object({
			duration: z.number().prefault(1),
			processTime: z.number().prefault(1),
			renewal: z.number().prefault(1),
		}),
		piplines: z.object({
			residency: z.boolean().prefault(false),
			citizenship: z.boolean().prefault(false),
			reunification: z.boolean().prefault(false),
			renewal: z.boolean().prefault(false),
		}),
		query: z.object({
			countryCode: z.string('Country ID is required'),
			name: z.string(),
			link: z.url(),
			description: z.string(),
			currencyCode: z.string(),
			processTime: z.object({
				min: z.number(),
				max: z.number().prefault(0),
				note: z.string().optional(),
			}),
			cost: z.object({
				min: z.number().optional(),
				max: z.number().prefault(0),
			}),
			duration: z.object({
				min: z.number(),
				max: z.number().prefault(0),
				note: z.string().optional(),
			}),
			documents: z.array(
				z.object({
					id: z.number(),
					documentId: z.number(),
					title: z
						.string()
						.transform(val => (val == '' ? null : null))
						.nullable(),
					cost: z.number().optional(),
					description: z.string().optional(),
					link: z.url().optional(),
					isRequired: z.boolean().prefault(false),
				})
			),
			restrictedNationalities: z.array(
				z.object({
					countryCode: z.string(),
					note: z.string(),
				})
			),
			citizenship: z.string().optional(),
			notes: z.array(
				z.object({
					counter: z.number(),
					note: z.string(),
				})
			),
			limitations: z.array(
				z.object({
					counter: z.number(),
					note: z.string(),
				})
			),
			restrictions: z.array(
				z.object({
					counter: z.number(),
					note: z.string(),
				})
			),
			requirements: z.array(
				z.object({
					counter: z.number(),
					note: z.string(),
				})
			),
			renewal: z.object({
				min: z.number().optional(),
				max: z.number().optional(),
				note: z.string().optional(),
			}),
		}),
	})
	.loose()

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

	/* {
    "query": {
        "documents": [
            {
                "id": 1,
                "documentId": 8,
                "title": "",
                "cost": 20,
                "description": "Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis.",
                "link": "https://google.com",
                "isRequired": false,
                "pathwayId": 0
            }
        ],
        "restrictedNationalities": [
            {
                "pathwayId": 0,
                "countryCode": "ARM",
                "note": "Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis."
            }
        ],
        "citizenship": "Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis.",
        "notes": [
            {
                "counter": 1,
                "note": "Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis."
            },
            {
                "counter": 2,
                "note": "Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis. Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis."
            }
        ],
        "limitations": [
            {
                "counter": 1,
                "note": "Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis."
            },
            {
                "counter": 2,
                "note": "Laboris nulla Lorem fugiat. Laborum eu elit do. Qui ut irure aliqua amet tempor dolore deserunt. Proident voluptate irure velit eiusmod dolor aliqua Lorem aute dolore excepteur cupidatat sunt aliquip officia. Proident adipisicing cupidatat Lorem ut aute quis qui reprehenderit laborum labore commodo amet. Enim in et pariatur esse voluptate deserunt incididunt enim sunt deserunt id. Aliqua minim duis sint quis cupidatat elit quis."
            }
        ]
    },
    "date": "2025-12-03T14:30:43.688Z",
    "durations": {
        "duration": 365,
        "processTime": 7,
        "renewal": 1
    },
    "piplines": {
        "residency": false,
        "citizenship": true,
        "reunification": false,
        "renewal": true
    }
} */

	CreatePathway: protectedProcedure.input(zCreatePathwayInput).mutation(async ({ ctx, input }) => {
		const { piplines, query } = input

		const user = ctx.session.user

		try {
			const newPathway = await ctx.db.pathway.create({
				data: {
					discordHandle: user?.name || '',
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
						createMany: {
							data: Object.entries(piplines)
								.map(([key, value]) =>
									value ?
										{
											pipeline: key.toUpperCase() as Prisma.PathwayPipeline['pipeline'],
											note:
												query[key as Prisma.PathwayPipeline['pipeline'] & keyof Query['query']]
												|| '',
										}
									:	null
								)
								.filter(d => d != null),
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
						min: piplines.renewal ? Number(query.renewal.min) : null,
						max: piplines.renewal ? Number(query.renewal.max) : null,
						note: query.renewal.note || '',
					},
					documents: {
						connectOrCreate: query.documents.map(doc => ({
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
