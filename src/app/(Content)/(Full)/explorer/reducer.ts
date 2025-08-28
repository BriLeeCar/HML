import {
	allFilters,
	tCookieAction,
	tDrawerAction,
	tFilterAction,
	tMasonryState,
	tSetCountriesAction,
} from '.'

export const masonryReducer = (
	state: tMasonryState,
	action:
		| tDrawerAction
		| tFilterAction
		| tSetCountriesAction
		| tCookieAction
) => {
	const newState = { ...state }

	if (action.type == 'SET_DRAWER') {
		Object.assign(newState, { drawerOpen: !state.drawerOpen })
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
	newState.filters = Array.from(new Set(newState.filters))
	window.localStorage.setItem(
		'explorer-filters',
		JSON.stringify(newState.filters.map((f) => f.key))
	)
	return newState
}

const parseFilters = (
	newState: tMasonryState,
	payloadFilters: tFilterAction['payload']
) => {
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
		countries: newState.db.countries
			.filter((c) => {
				return newState.filters.every((f) => {
					return f.matches(c)
				})
			})
			.sort((a, b) => a.name.localeCompare(b.name)),
	})
	return newState
}
