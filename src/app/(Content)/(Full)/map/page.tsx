import { countryBasics, zodCountryRest } from '~/data/baseCountryApi'
import countryPaths from '~/data/countryDataWithPaths.json'
import { WorldMap } from './Base'

const Map = async () => {
	const countriesWithData: { [key: string]: zodCountryRest } = {}

	await Promise.all(
		countryPaths
			.filter((c) => c.haveData && c.name && c.abbr)
			.map(async (c) =>
				Object.assign(countriesWithData, {
					[c.name!]: await countryBasics({
						abbr: c.abbr,
					}),
				})
			)
	)
	return <WorldMap countriesWithData={countriesWithData} />
}

export default Map
