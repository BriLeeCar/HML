import { isUS, tCountryKeys, tCountryPaths } from '@/map/util'
import countryPaths from '~/data/mapPathData.json'

export const getCountriesWithData = (): tCountryPaths => {
	const countries = countryPaths as tCountryPaths

	const countryKeys = Object.keys(countries).filter((country) => {
		const key = country as tCountryKeys
		return !isUS({ tier: countries[key].tier })
	})

	const countriesWithData = {} as tCountryPaths
	countryKeys.forEach((country) => {
		const { abbr, tier, haveData, path } =
			countries[country as tCountryKeys]
		Object.assign(countriesWithData, {
			[country]: {
				abbr,
				tier,
				haveData,
				path,
			},
		})
	})
	return countriesWithData
}
