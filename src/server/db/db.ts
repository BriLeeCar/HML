import { getDBCountries } from './_jsonFiles'

export class DB {
	countries: Array<ApiData.CountryBase & ApiData.CountryETCData>
	constructor() {
		this.countries = getDBCountries()
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

	getCountriesForFilter(
		filterBy?: Array<keyof ApiData.ExplorerFilters>
	) {
		return this.countries
			.map((country) => {
				return {
					abbr: country.abbr,
					name: country.name,
					unMember: country.api.unMember,
					prideScore:
						country.communities?.prideScore
						&& country.communities?.prideScore > 0,
					transSafety: country.communities?.transSafety,
				}
			})
			.filter((ea: ApiData.ExplorerFilters) =>
				filterBy ? filterBy.every((key) => ea[key]) : true
			)
	}

	filterByCommunities(
		communities: Array<keyof ApiData.ExplorerFilters>,
		country: ApiData.CountryBase & ApiData.CountryETCData
	) {
		const { prideScore, transSafety } = country.communities || {}
		const results = communities.map((key) => {
			if (key === 'prideScore' && prideScore && prideScore > 0) {
				return true
			} else if (key === 'transSafety' && transSafety === true) {
				return true
			} else if (key == 'unMember' && country.api.unMember == true) {
				return true
			} else return false
		})
		if (results.some((r) => r === false)) return false
		return true
	}

	getCountryStats(
		country: ApiData.CountryBase & ApiData.CountryETCData
	) {
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

	getCommunityAttributes(
		country: ApiData.CountryBase & ApiData.CountryETCData
	) {
		return {
			isUn: country.api.unMember,
			prideScore: country.communities?.prideScore,
			racismRank: country.communities?.racismRank,
			transSafety: country.communities?.transSafety,
		}
	}

	getCountriesWithPathways() {
		return this.countries.filter(
			(country) => country.pathways && country.pathways.length > 0
		)
	}
}

export type tDB = ReturnType<typeof db>
const db = () => new DB()

export default db
