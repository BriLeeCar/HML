import { countryBasics, zodCountryRest } from '~/data/baseCountryApi'
import countryPaths from '~/data/mapPathData.json'
import { WorldMap } from './Base'

const Map = async () => {
	const countriesWithData: { [key: string]: zodCountryRest } = {}

	await Promise.all(
		Object.keys(countryPaths)
			.filter(
				(c) => countryPaths[c as keyof typeof countryPaths].haveData
			)
			.map(async (c) =>
				Object.assign(countriesWithData, {
					[c]: await countryBasics({
						abbr: countryPaths[c as keyof typeof countryPaths].abbr,
					}),
				})
			)
	)
	return (
		<main className='h-screen w-screen'>
			<WorldMap countriesWithData={countriesWithData} />
		</main>
	)
}

export default Map
