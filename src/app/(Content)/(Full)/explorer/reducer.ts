import { allFilters, tMasonryActions, tMasonryState } from '.'

export const masonryReducer = (
	state: tMasonryState,
	action: tMasonryActions
) => {
	const newState = { ...state }

	if (action.type == 'SET_DRAWER') {
		Object.assign(newState, {
			drawer: {
				status: !state.drawer.status,
				size: action.payload.size,
			},
		})
		return newState
	}

	if (action.type == 'SET_FILTERS') {
		parseFilters(newState, action.payload)
	}
	if (action.type == 'SET_COOKIES') {
		action.payload.forEach((key) => {
			const filter = allFilters.find((f) => f.key == key)
			if (filter) {
				parseFilters(newState, { ...filter, value: true })
			}
		})
	}
	if (action.type == 'CLEAR_FILTERS') {
		newState.filters = []
		parseFilters(newState)
	}

	if (action.type == 'SET_COUNTRIES') {
		const countries = newState.db.getCountriesWithPathways()

		Object.assign(newState, {
			countries: countries,
		})
	}
	newState.filters = Array.from(new Set(newState.filters))

	if (action.type == 'SET_SEARCH') {
		Object.assign(newState, {
			search: {
				...newState.search,
				query: action.payload.query,
			},
		})
		if (action.payload.query == '') {
			parseFilters(newState, newState.filters[0] || undefined)
		} else {
			Object.assign(newState, {
				countries: newState.db
					.getCountriesWithPathways()
					.filter((country) =>
						country.name
							.toLowerCase()
							.includes(action.payload.query.toLowerCase())
					),
			})

			parseFilters(
				newState,
				newState.filters[0] || undefined,
				newState.countries
			)
		}
	}
	window.localStorage.setItem(
		'explorer-filters',
		JSON.stringify(newState.filters.map((f) => f.key))
	)
	return newState
}

const parseFilters = (
	newState: tMasonryState,
	payloadFilters?: tMasonryState['filters'][0],
	countries?: ApiData.Country[]
) => {
	const useCountries =
		countries || newState.db.getCountriesWithPathways()
	if (!payloadFilters) {
		Object.assign(newState, {
			countries: useCountries.sort((a, b) =>
				a.name.localeCompare(b.name)
			),
		})
		return newState
	}
	newState.filters = [
		...new Set(
			newState.filters.filter((f) => {
				if (
					payloadFilters.value == false
					&& f.key == payloadFilters.key
				) {
					return false
				}
				return f.key != payloadFilters.key
			})
		),
	]

	if (
		payloadFilters.value == true
		&& !newState.filters
			.map((n) => n.key)
			.includes(payloadFilters.key)
	) {
		newState.filters.push(payloadFilters)
	}

	Object.assign(newState, {
		countries: useCountries
			.filter((c) => {
				return newState.filters.every((f) => {
					return f.matches(c)
				})
			})
			.sort((a, b) => a.name.localeCompare(b.name)),
	})
	return newState
}
