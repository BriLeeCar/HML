import z from 'zod/v4'
import { toTitleCase } from '~/util/text'
import { zContinents, zPre, zTransform } from '~/util/zod'
import { getExchangeRate } from './exchangeRateApi'

export const countryBasics = async ({
	country,
	abbr,
}: {
	country?: string
	abbr?: string
}) => {
	const searchString = (country || abbr)?.toLowerCase()
	const searchType = country ? 'name' : 'alpha'

	const data = await fetch(
		`https://restcountries.com/v3.1/${searchType}/${searchString}`
	)
	if (!data.ok) {
		console.warn(`Failed to fetch data for country: ${country}`)
		return null
	} else {
		if (data.ok) {
			let rawData = await data.json()
			if (rawData.length > 1) {
				rawData = rawData.filter((c: AnySafe) =>
					searchType == 'name' ?
						c.name.common.toLowerCase() === searchString
					:	c.cca2.toLowerCase() === searchString
				)
			}
			try {
				const countryStatus = zCountryRest.safeParse(rawData[0])
				if (!countryStatus.success) {
					console.error(
						'Country data validation failed:',
						countryStatus.error.issues
					)
					return null
				}
				const countryData = countryStatus.data
				if (countryData.currencies !== undefined) {
					const exchangeRates = await getExchangeRate()
					Object.keys(countryData.currencies).forEach((key) => {
						Object.assign(countryData.currencies[key], {
							exchangeRate: exchangeRates[key],
						})
					})
				}
				return countryData
			} catch (error) {
				console.error('Error processing country data:', error)
				return null
			}
		}
	}
}

const zCountryRest = z.object({
	name: z.object({
		common: zTransform.toTitleCase,
		official: zTransform.toTitleCase,
		nativeName: z.record(
			z.string(),
			z.object({
				official: zTransform.toTitleCase,
				common: zTransform.toTitleCase,
			})
		),
	}),
	independent: z.boolean(),
	unMember: z.boolean(),
	cca2: zTransform.toUpperCase,
	cca3: z.number().or(z.string()),
	cioc: zTransform.toUpperCase,
	currencies: z.record(
		z.string(),
		z.object({
			name: z.string(),
			symbol: z.string(),
			exchangeRate: z.number().optional(),
		})
	),
	capital: z.array(z.string()),
	region: z.string(),
	subregion: z.string(),
	languages: z.record(z.string(), z.string()),
	latlng: z.tuple([z.number(), z.number()]),
	area: z.number().optional(),
	flag: z.emoji(),
	flags: z.object({
		png: z.url(),
		svg: z.url(),
		alt: z.string().optional(),
	}),
	population: zTransform.toNumber.or(z.number()),
	timezones: z.array(z.string().regex(/^UTC([+-]\d{2}:\d{2})?/)),
	continents: z.array(
		zPre.toLowerCase
			.pipe(zContinents)
			.pipe(z.transform((val) => toTitleCase(val)))
	),
	maps: z.object({
		googleMaps: z.url(),
		openStreetMaps: z.url().or(
			z
				.string()
				.startsWith('openstreetmap.org')
				.transform((val) => `https://${val}`)
		),
	}),
})

export type zodCountryRest = z.infer<typeof zCountryRest>
