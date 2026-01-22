import z from 'zod/v4'
import type { Country, CountryCurrency, CountryLanguage } from '~/server/prisma/generated/browser'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { transformCountryCurrency } from './routerCurrency'
import { transformCountryLanguage } from './routerLanguage'

type CountryCol = Country & {
	countryCurrencies: CountryCurrency[]
	countryLanguages: CountryLanguage[]
}

type CountryOutput = Record<'currencies' | 'languages', boolean> & Record<keyof Country, boolean>

const zSelectIncludeKeys = z.partialRecord(
	z.enum(['code', 'name', 'currencies', 'languages']),
	z.boolean()
) as z.ZodType<Partial<Record<keyof CountryCol, boolean>>>

export const CountryInput = z.object({
	query: z.preprocess(
		val => {
			if (Array.isArray(val)) return val
			return [val]
		},
		z.array(
			z
				.object({
					code: z.string().length(3).toUpperCase(),
				})
				.loose()
		)
	),
	select: zSelectIncludeKeys.optional(),
})

const schemaCountry = z
	.object({
		code: z.string(),
		name: z.string(),
		countryCurrencies: z.array(transformCountryCurrency).optional(),
		countryLanguages: z.array(transformCountryLanguage).optional(),
	})
	.transform(country => {
		const { code, name, countryCurrencies, countryLanguages } = country

		const returned = {
			code,
			name,
		} as {
			code: string
			name: string
			currencies: Array<z.infer<typeof transformCountryCurrency>>
			languages?: Array<z.infer<typeof transformCountryLanguage>>
		}

		if (countryLanguages) {
			returned['languages'] = countryLanguages
		}
		if (countryCurrencies) {
			returned['currencies'] = countryCurrencies
		}

		return returned
	})

export const CountryRouter = createTRPCRouter({
	getCountriesByCode: publicProcedure
		.input(
			z.object({
				query: z.preprocess(
					val => {
						if (Array.isArray(val)) return val
						return [val]
					},
					z.array(
						z
							.object({
								code: z.string().length(3).toUpperCase(),
							})
							.loose()
					)
				),
				select: zSelectIncludeKeys.optional(),
			})
		)
		.query(
			async ({
				input,
				ctx,
			}: TRPC.CTX & {
				input: z.infer<typeof CountryInput>
			}) => {
				const { query, select } = input
				const { currencies, languages, ...restSelect } = (select || {}) as CountryOutput

				const result = await ctx.db.country.findMany({
					where: {
						code: {
							in: query.map(c => c.code),
						},
					},
					select: {
						...restSelect,
						...(currencies ?
							{
								countryCurrencies: {
									select: {
										currency: true,
									},
								},
							}
						:	{}),
						...(languages ?
							{
								countryLanguages: {
									select: {
										language: true,
									},
								},
							}
						:	{}),
					},
				})
				return z.array(schemaCountry).parse(result)
			}
		),
})
