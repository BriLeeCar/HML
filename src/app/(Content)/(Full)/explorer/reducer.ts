import {
	tDrawerAction,
	tFilterAction,
	tMasonryState,
	tSetCountriesAction,
} from './util'

export const masonryReducer = (
	state: tMasonryState,
	action: tDrawerAction | tFilterAction | tSetCountriesAction
) => {
	const newState = { ...state }

	if (action.type == 'SET_DRAWER') {
		Object.assign(newState, { drawerOpen: !state.drawerOpen })
		return newState
	}

	console.log({ action })

	if (action.type == 'SET_FILTERS') {
		newState.filters = [
			...new Set(
				newState.filters.filter((f) => {
					if (
						action.payload.value == false
						&& f == action.payload.key
					) {
						return false
					}
					return f != action.payload.key
				})
			),
		]

		if (
			action.payload.value == true
			&& !newState.filters.includes(action.payload.key)
		) {
			newState.filters.push(action.payload.key)
		}
		Object.assign(newState, {
			countries: state.db.countries
				.filter(
					(c) =>
						c.images.havePhoto == true && action.payload.matches(c)
				)
				.sort((a, b) => a.name.localeCompare(b.name)),
		})
	}

	newState.filters = Array.from(new Set(newState.filters))
	return newState
}
