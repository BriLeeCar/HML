import type { tCountry, tDB, tExplorerFilters } from '~/server/db/db'

// #region ? Types
export type tMasonryState = {
	countries: tCountry[]
	drawerOpen: boolean
	filters: Array<keyof tExplorerFilters>
	// columns: tCountry[][]
	db: tDB
}

export type tDrawerAction = {
	type: 'SET_DRAWER'
	payload?: null
}

export type tFilterAction = {
	type: 'SET_FILTERS'
	payload: {
		key: keyof tExplorerFilters
		value: boolean
		matches: (country: tCountry) => boolean
	}
}

export type tSetCountriesAction = {
	type: 'SET_COUNTRIES'
	payload: null
}

export type tMasonryReducer = {
	countries: tCountry[]
	drawerOpen: boolean
	filters: Array<keyof tExplorerFilters>
	db: tDB
}

export type tDocSizes = {
	screenWidth: number
	containerWidth: number
}

export type tDrawerFilter = {
	label: string
	dataKey: keyof tExplorerFilters
	matches: (country: tCountry) => boolean
}

export type tDrawerFilterGroup = {
	group: string
	items: tDrawerFilter[]
}
// #endregion ?

export const breakpoints = [
	{ min: '320px', columns: 2 },
	{ min: '640px', columns: 3 },
	{ min: '1024px', columns: 4 },
] as {
	min?: string
	max?: string
	columns: number
}[]

export const handleColumns = (
	docSizes: tDocSizes,
	reducer: tMasonryReducer
) => {
	const width = docSizes.containerWidth
	let newColumns = 1
	if (breakpoints) {
		for (let i = 0; i < breakpoints.length; i++) {
			const bp = breakpoints[i]

			const min =
				bp.min ? parseInt(bp.min)
				: i == 0 ? 0
				: parseInt(breakpoints[i - 1].max || '0')

			const max =
				bp.max ? parseInt(bp.max)
				: i == breakpoints.length - 1 ? Infinity
				: parseInt(breakpoints[i + 1].min || 'Infinity')

			if (width >= min && width <= max) {
				newColumns = bp.columns
			}
		}
	}
	const newColsArray = Array.from(
		{ length: newColumns },
		() => []
	) as tCountry[][]

	for (let i = 0, j = 0; i <= reducer.countries.length; i++, j++) {
		j = j >= newColumns ? 0 : j
		reducer.countries[i] && newColsArray[j].push(reducer.countries[i])
	}

	return [...newColsArray.filter((c) => c != undefined)]
}

export const filterCbs: tDrawerFilterGroup[] = [
	{
		group: 'For my livelihood, I...',
		items: [
			{
				label: 'Have a monthly income',
				dataKey: 'income' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
			{
				label: 'Will need help to find a job',
				dataKey: 'jobMarket' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
			{
				label: 'Can work digitally from anywhere',
				dataKey:
					'digitalNomadVisa' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
		],
	},
	{
		group: 'I am....',
		items: [
			{
				label: 'Black',
				dataKey: 'black' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) =>
					(country.communities.racismRank ?? 0) > 0,
			},
			{
				label: 'Spanish, Hispanic, or Latinx',
				dataKey: 'latinx' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
			{
				label: 'LGBTQIA+',
				dataKey: 'prideScore',
				matches: (country: tCountry) =>
					(country.communities.prideScore ?? -1) >= 0,
			},
			{
				label: 'Trans, Intersex or Non-binary',
				dataKey: 'transSafety',
				matches: (country: tCountry) =>
					country.communities.transSafety == true,
			},
			{
				label: 'Disabled',
				dataKey:
					'disabilityAccess' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
			{
				label: '18-30 years old',
				dataKey: 'age18-30' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
			{
				label: '60+ years old',
				dataKey: 'age60+' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
		],
	},
	{
		group: 'My Family...',
		items: [
			{
				label: 'Includes Kid(s)',
				dataKey:
					'familyFriendly' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
			{
				label: 'Includes Pet(s)',
				dataKey: 'petFriendly' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
		],
	},
	{
		group: "I'm of...",
		items: [
			{
				label: 'African descent',
				dataKey:
					'africanDescent' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
			{
				label: 'Spanish or Latin American descent',
				dataKey: 'latinDescent' as unknown as keyof tExplorerFilters,
				matches: (country: tCountry) => country && true,
			},
		],
	},
]
