import { tMapReducer } from './util'

export const mapReducer = (
	state: tMapReducer['state'],
	action: tMapReducer['action']
) => {
	if (action.type) {
		switch (action.type) {
			case 'visited':
				const {
					country,
					inView,
				}: { country: string; inView: boolean } = action.details

				if (
					(inView && state.inViewCountries.includes(country))
					|| (!inView && !state.inViewCountries.includes(country))
				) {
					return state
				}
				const newInViewCountries = state.inViewCountries.filter(
					(c) => c != country
				)
				if (!inView) {
					return {
						...state,
						inViewCountries: newInViewCountries,
					}
				}

				return {
					...state,
					inViewCountries: [...newInViewCountries, country]
						.filter((ea) => ea)
						.sort(),
				}
			case 'selected':
				return {
					...state,
				}
			case 'set-boundaries':
				const rect = document
					.querySelector('#worldMap')
					?.getBoundingClientRect()
				if (!rect) return state
				if (
					-rect.right + rect.left + window.innerWidth
					!= state.boundaries.left
				) {
					return {
						...state,
						boundaries: {
							top: -5,
							bottom: 0,
							left: -rect.right + rect.left + window.innerWidth,
							right: 0,
						},
					}
				}
				return state
			case 'visitCookie':
				return {
					...state,
					hasVisited: false,
				}
			case 'countryHover':
				return {
					...state,
					hovered: action.details as string,
				}
			case 'clearHover':
				return {
					...state,
					hovered: null,
				}
			case 'setDragging':
				return {
					...state,
					dragging: action.details,
				}
		}
	}

	return state
}
