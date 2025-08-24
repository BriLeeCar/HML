import { createContext, ReactNode, useContext, useMemo } from 'react'
import { countryBasics } from '../baseCountryApi'
import countries from '../countries.json'

const CountriesContext = createContext<typeof countries | null>(null)

const countryContextActions = (store: typeof countries) => ({
	find: (type: 'abbr' | 'name', countrySearch: string) => {
		return store?.find(
			(c) => countrySearch.toLowerCase() == c[type].toLowerCase()
		)
	},
	getMapPaths: () => {
		return store!.filter((c) => c.svgPath)
	},
	fetch: async (countryAbbr: string) => {
		return await countryBasics({
			abbr: countryAbbr,
		})
	},
	eq: (countryKey: keyof (typeof countries)[0], value: string) => {
		return store?.find((c) => c[countryKey] === value)
	},
	tier: {
		isNow: (country: tCountry) => country.tier == 'now',
		isSoon: (country: tCountry) => country.tier == 'soon',
		isNone: (country: tCountry) => country.tier == 'None',
		isTiered: (country: tCountry) => country.tier != 'None',
	},
	getSafety: (countryAbbr: string) => {
		const country = store?.find(
			(c) => c.abbr.toLowerCase() === countryAbbr.toLowerCase()
		)
		return {
			pride: country?.homophobia,
			racism: country?.['least racist'],
		}
	},
})

export const useCountries = () => {
	const context = useContext(CountriesContext)
	if (!context) {
		throw new Error(
			'useCountries must be used within a CountriesProvider'
		)
	}

	const storeCountries = useMemo(() => {
		return {
			countries: context,
			...countryContextActions(countries),
		}
	}, [])

	return storeCountries
}

export const CountriesProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	return (
		<CountriesContext.Provider value={countries}>
			{children}
		</CountriesContext.Provider>
	)
}

type tCountryActionStore = ReturnType<typeof countryContextActions>
export type tCountryStore = typeof countries
export type tCountry = (typeof countries)[0]
