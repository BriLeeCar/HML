import countries from './countries.json'
import api from './countries_api.json'
import climate from './countries_climate.json'
import communities from './countries_communities.json'
import crime from './countries_crime.json'
import economy from './countries_economy.json'
import health from './countries_health.json'
import images from './countries_images.json'
import quality from './countries_quality.json'

const countriesWithClimate = climate as Array<tClimate>
const countriesWithHealth = health as Array<tHealth>
const countriesWithSafety = communities as Array<tCommunities>
const countriesWithImages = images as Array<tImages>
const countriesWithEconomy = economy as Array<tEconomy>
const countriesWithQuality = quality as Array<tQuality>
const countriesWithCrime = crime as Array<tCrime>
const countriesWithAPI = api as Array<tPreCountryApi>

const mergeByAbbr = (params: {
	baseArr: tCountry[]
	arrays: Array<{
		groupKey: string
		data: Array<{ abbr: string; [key: string]: unknown }>
	}>
}) => {
	const { baseArr, arrays } = params

	return baseArr.map((baseItem) => {
		const thisItem = { ...baseItem } as tCountry & tCountryETCData

		arrays.forEach((ea) => {
			const key: tCountryKeys = ea.groupKey as keyof tCountryETCData

			const newData = ea.data.find(
				(dataItem) =>
					dataItem.abbr.toLowerCase() == baseItem.abbr.toLowerCase()
			)

			if (newData) {
				Object.assign(thisItem, { [key]: newData })
			}
		})
		return thisItem
	})
}

class DB {
	countries: Array<tCountry & tCountryETCData>
	constructor() {
		this.countries = mergeByAbbr({
			baseArr: countries,
			arrays: [
				{
					groupKey: 'climate',
					data: countriesWithClimate,
				},
				{
					groupKey: 'health',
					data: countriesWithHealth,
				},
				{
					groupKey: 'communities',
					data: countriesWithSafety,
				},
				{
					groupKey: 'images',
					data: countriesWithImages,
				},
				{
					groupKey: 'economy',
					data: countriesWithEconomy,
				},
				{
					groupKey: 'quality',
					data: countriesWithQuality,
				},
				{
					groupKey: 'api',
					data: countriesWithAPI,
				},
				{
					groupKey: 'crime',
					data: countriesWithCrime,
				},
			],
		})
	}

	getCountries() {
		return this.countries
	}

	getCountryByAbbr(abbr: string) {
		return this.countries.find(
			(country) => country.abbr.toLowerCase() === abbr.toLowerCase()
		)
	}

	getMapPaths() {
		return this.countries
			.filter((c) => c.svgPath)
			.map((country) => ({
				...country,
				svgPath: country.svgPath || '',
			}))
	}

	getCountriesForFilter(filterBy?: Array<keyof tExplorerFilters>) {
		return this.countries
			.map((country) => {
				return {
					abbr: country.abbr,
					name: country.name,
					unMember: country.unMember,
					prideScore:
						country.communities?.prideScore
						&& country.communities?.prideScore > 0,
					transSafety: country.communities?.transSafety,
				}
			})
			.filter((ea: tExplorerFilters) =>
				filterBy ? filterBy.every((key) => ea[key]) : true
			)
	}

	filterByCommunities(
		communities: Array<keyof tExplorerFilters>,
		country: tCountry & tCountryETCData
	) {
		const { prideScore, transSafety } = country.communities || {}
		const results = communities.map((key) => {
			if (key === 'prideScore' && prideScore && prideScore > 0) {
				// console.log(country.name, key, country)
				return true
			} else if (key === 'transSafety' && transSafety === true) {
				// console.log(country.name, key, country)
				return true
			} else if (key === 'unMember' && country.unMember === true) {
				// console.log(country.name, key, country)
				return true
			} else return false
		})
		console.log('results', results)
		if (results.some((r) => r === false)) return false
		return true
	}

	getCountryStats(country: tCountry & tCountryETCData) {
		const stats = [
			{
				title: 'Safety Index',
				value: country.crime?.safety,
				note: 'Higher is better',
			},
			{
				title: 'Health Index',
				value: country.health?.index,
				note: 'Higher is better',
			},
			{
				title: 'Cost of Living',
				value: country.economy?.col,
				note: 'Higher is worse',
			},
			{
				title: 'Quality Index',
				value: country.quality?.index,
				note: 'Higher is better',
			},
		]
		return stats
	}

	getCommunityAttributes(country: tCountry & tCountryETCData) {
		return {
			isUn: country.communities?.isUn,
			prideScore: country.communities?.prideScore,
			racismRank: country.communities?.racismRank,
			transSafety: country.communities?.transSafety,
		}
	}
}

export type tDB = ReturnType<typeof db>
const db = () => new DB()
export default db

// #region ? TYPES

type tCountryETCData = {
	climate: tClimate
	health: tHealth
	communities: tCommunities & { isUn: boolean }
	images: tImages
	economy: tEconomy
	quality: tQuality
	crime: tCrime
} & tCountryApi

type tCountryKeys = keyof tCountryETCData

type tClimate = {
	abbr: string
	pollution: number
	climate: number
}

type tHealth = {
	abbr: string
	rank: number | null
	cost: number | null
	index: number | null
}

type tCommunities = {
	abbr: string
	prideScore: number | null
	racismRank: number | null
	transSafety: boolean
}

type tImages = {
	abbr: string
	name: string | null
	handle: string | null
	havePhoto: boolean
	width: number | null
	height: number | null
}

type tEconomy = {
	abbr: string
	col: number | null
	purchasingPower: number | null
	propertyToIncome: number | null
}

type tQuality = {
	abbr: string
	index: number | null
	rank: number | null
}

type tCrime = {
	abbr: string
	index: number | null
	safety: number | null
}

type tCountry = {
	abbr: string
	name: string
	svgPath: string | null
	tier: string | null
}

type tPreCountryApi = {
	unMember: boolean
	abbr: string
	name: string
	flag: string
	population: number
	region: string
	subregion: string
	languages: Record<string, string>
	currencies: Record<string, { name: string; symbol: string }>
}

type tCountryApi = Omit<
	tPreCountryApi,
	'languages' | 'currencies' | 'abbr' | 'isUn'
> & {
	languages: Array<{
		abbr: string
		name: string
	}>
	currencies: Array<{
		abbr: string
		name: string
		symbol: string
	}>
}

export type tExplorerFilters = {
	abbr: string
	name: string
	unMember: boolean
	prideScore: boolean | 0 | null
	transSafety: boolean
}
// #endregion ?
