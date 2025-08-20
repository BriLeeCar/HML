import countryPaths from '~/data/mapPathData.json'

export const getCountriesWithData = (): {
	[key: string]: {
		abbr: string
		tier: 0 | 1 | 2 | 3 | 999
		haveData: boolean
		path: string
	}
} => {
	const countryKeys = Object.keys(countryPaths).filter((country) => {
		return (
			countryPaths[country as keyof typeof countryPaths].haveData
			&& countryPaths[country as keyof typeof countryPaths].tier
				!== 999
		)
	})

	const countriesWithData = {}
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
