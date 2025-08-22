import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand/react'
import { createStore } from 'zustand/vanilla'
import countryData from '../countryDataWithPaths.json'

export const createCountryStore = (
	initState: CountryStoreState = defaultInitCountryStore
) => {
	return createStore<CountryStore>()((set) => ({
		...initState,
		verifyCountry: (countryAbbr: string) => {
			const country = countryData.find(
				(c) => c.abbr === countryAbbr.toUpperCase()
			)
			if (country) {
				return set((state) => {
					if (state.countries.some((c) => c.abbr === country.abbr)) {
						return state
					}
					return {
						countries: [...state.countries, country].sort(
							(a, b) => a.name?.localeCompare(b.name || '') || 1
						),
					}
				})
			}
			return set((state) => state)
		},
		addCountry: (countryAbbr: string) =>
			set((state) => {
				if (
					state.countries.some(
						(c) => c.abbr === countryAbbr.toUpperCase()
					)
				) {
					return state
				}
				const country = countryData.find(
					(c) => c.abbr === countryAbbr.toUpperCase()
				)
				if (country) {
					return { countries: [...state.countries, country] }
				}
				return state
			}),
	}))
}

export const countryStoreUtils = {
	findCountry: (store: CountryStore, countryAbbr: string) => {
		return store.countries.find(
			(c) => c.abbr === countryAbbr.toUpperCase()
		)
	},
}

const CountryStoreContext = createContext<
	CountryStoreApi | undefined
>(undefined)

export const CountryStoreProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const storeRef = useRef<CountryStoreApi | null>(null)
	if (storeRef.current === null) {
		storeRef.current = createCountryStore()
	}

	return (
		<CountryStoreContext.Provider value={storeRef.current}>
			{children}
		</CountryStoreContext.Provider>
	)
}

export const useCountryStore = () => {
	const store = useContext(CountryStoreContext)
	if (!store) {
		throw new Error(
			'useCountryStore must be used within a CountryStoreProvider'
		)
	}

	return useStore(store)
}

type CountryStoreState = {
	countries: typeof countryData
}

export type CountryStore = CountryStoreState & CountryStoreActions
type CountryStoreApi = ReturnType<typeof createCountryStore>
type CountryStoreActions = {
	addCountry: (countryAbbr: string) => void
	verifyCountry: (countryAbbr: string) => void
}

const defaultInitCountryStore: CountryStoreState = {
	countries: [] as unknown as typeof countryData,
}
