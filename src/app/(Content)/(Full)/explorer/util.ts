// #region ? Types
type tFilter = {
	key: keyof ApiData.tExplorerFilters
	value: boolean
	matches: (country: ApiData.Country) => boolean
}

type tMasonaryAction<T, P> = {
	type: T
} & (P extends null ? { payload?: P } : { payload: P })

export type tMasonryState = {
	countries: ApiData.Country[]
	drawerOpen: boolean
	filters: Array<tFilter>
	db: ApiData.DB
}

export type tDrawerAction = tMasonaryAction<'SET_DRAWER', null>
export type tFilterAction = tMasonaryAction<'SET_FILTERS', tFilter>
export type tSetCountriesAction = tMasonaryAction<
	'SET_COUNTRIES',
	null
>
export type tCookieAction = tMasonaryAction<
	'SET_COOKIES',
	tFilter['key'][]
>

export type tDocSizes = {
	screenWidth: number
	containerWidth: number
}

export type tDrawerFilter = {
	label: string
	dataKey: tFilter['key']
} & Pick<tFilter, 'matches'>

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
	reducer: tMasonryState
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
	) as ApiData.Country[][]

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
				dataKey:
					'income' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some((p) => p.monthly_income == true)
						=== true,
			},
			{
				label: 'Will need help to find a job',
				dataKey:
					'jobMarket' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some((p) => p.job_required == false)
						=== true,
			},
			{
				label: 'Can work digitally from anywhere',
				dataKey:
					'digitalNomadVisa' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some((p) => p.digital_worker == true)
						=== true,
			},
		],
	},
	{
		group: 'I am....',
		items: [
			{
				label: 'Black',
				dataKey: 'black' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) =>
					(country.communities.racismRank ?? 0) > 0,
			},
			{
				label: 'LGBTQIA+',
				dataKey: 'prideScore',
				matches: (country: ApiData.Country) =>
					(country.communities.prideScore ?? -1) >= 0,
			},
			{
				label: 'Trans, Intersex or Non-binary',
				dataKey: 'transSafety',
				matches: (country: ApiData.Country) =>
					country.communities.transSafety == true,
			},
			{
				label: 'Disabled',
				dataKey:
					'disabilityAccess' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) => country && true,
			},
			{
				label: '18-30 years old',
				dataKey:
					'age18-30' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some((p) => p.age_18_30 == true)
						=== true,
			},
			{
				label: '60+ years old',
				dataKey:
					'age60+' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some((p) => p.age_60_plus == true)
						=== true,
			},
		],
	},
	{
		group: 'My Family...',
		items: [
			{
				label: 'Includes Kid(s)',
				dataKey:
					'familyFriendly' as unknown as keyof ApiData.tExplorerFilters,
				matches: (country: ApiData.Country) => country && true,
			},
		],
	},
]

export const allFilters: Pick<tFilter, 'key' | 'matches'>[] =
	filterCbs.flatMap((group) =>
		group.items.map((item) => ({
			key: item.dataKey,
			matches: item.matches,
		}))
	)
