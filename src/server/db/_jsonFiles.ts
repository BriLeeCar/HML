import countries from './countries.json'
import api from './countries_api.json'
import climate from './countries_climate.json'
import communities from './countries_communities.json'
import crime from './countries_crime.json'
import economy from './countries_economy.json'
import health from './countries_health.json'
import images from './countries_images.json'
import quality from './countries_quality.json'
import pathways from './pathways.json'

const countriesWithClimate = climate as Array<ApiData.Climate>
const countriesWithHealth = health as Array<ApiData.Health>
const countriesWithSafety = communities as Array<ApiData.Communities>
const countriesWithImages = images as Array<ApiData.Images>
const countriesWithEconomy = economy as Array<ApiData.Economy>
const countriesWithQuality = quality as Array<ApiData.Quality>
const countriesWithCrime = crime as Array<ApiData.Crime>
const countriesWithAPI = api as Array<ApiData.PreCountryApi>
const countriesWithPathways = pathways as Array<ApiData.Pathway>

const mergeByAbbr = (params: {
	baseArr: ApiData.CountryBase[]
	arrays: Array<{
		groupKey: string
		data: Array<{ abbr: string; [key: string]: unknown }>
	}>
}) => {
	const { baseArr, arrays } = params

	return baseArr.map((baseItem) => {
		const thisItem = { ...baseItem } as ApiData.CountryBase
			& ApiData.CountryETCData

		arrays.forEach((ea) => {
			const key: ApiData.CountryKeys =
				ea.groupKey as keyof ApiData.CountryETCData

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

export const getDBCountries = () => {
	const newCountries = mergeByAbbr({
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

	countriesWithPathways.forEach((p) => {
		const country = newCountries.find(
			(c) => c.abbr.toLowerCase() == p.abbr.toLowerCase()
		)

		if (country) {
			if (!country['pathways']) {
				Object.assign(country, {
					pathways: [] as ApiData.Pathway[],
				})
			}
			country['pathways']?.push(p)
		}
	})

	return newCountries
}
