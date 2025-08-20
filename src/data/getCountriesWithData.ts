import { tCountryPaths } from '@/map/util'
import countryPaths from '~/data/mapPathData.json'

export const getCountriesWithData = (): tCountryPaths => {
	const countryKeys = Object.keys(countryPaths).filter((country) => {
		return (
			countryPaths[country as keyof typeof countryPaths].haveData
			&& countryPaths[country as keyof typeof countryPaths].tier
				!== 999
		)
	})

	const countriesWithData = {} as tCountryPaths
	countryKeys.forEach((country) => {
		const { abbr, tier, haveData, path } =
			countryPaths[country as keyof typeof countryPaths]
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
