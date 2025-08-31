// #region ? Types

export type tReducerDispatch = (action: tMasonryActions) => void

type tMasonaryAction<T, P> = {
	type: T
} & (P extends null ? { payload?: P } : { payload: P })

export type tMasonryState = {
	countries: ApiData.Country[]
	drawer: {
		status: boolean
		size: '' | 'sm' | 'md' | 'lg'
	}
	filters: Array<{
		key: keyof ApiData.ExplorerFilters
		value: boolean
		matches: (country: ApiData.Country) => boolean
	}>
	db: ApiData.DB
	search: {
		query: string
	}
}

export type tMasonryActions =
	| tMasonaryAction<'SET_DRAWER', { size: '' | 'sm' | 'md' | 'lg' }>
	| tMasonaryAction<'SET_FILTERS', tMasonryState['filters'][0]>
	| tMasonaryAction<'SET_COUNTRIES', null>
	| tMasonaryAction<'CLEAR_FILTERS', null>
	| tMasonaryAction<
			'SET_COOKIES',
			tMasonryState['filters'][0]['key'][]
	  >
	| tMasonaryAction<'SET_SEARCH', { query: string }>

export type tDrawerFilter = {
	label: string
	dataKey: tMasonryState['filters'][0]['key']
} & Pick<tMasonryState['filters'][0], 'matches'>

type tDrawerFilterGroup = {
	group: string
	items: tDrawerFilter[]
}
// #endregion ?

export const handleColumns = (reducer: tMasonryState) => {
	const countries = reducer.countries
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((c) => c)
	const columnArrays = [
		{ min: '320px', columns: 2 },
		{ min: '640px', columns: 3 },
		{ min: '1024px', columns: 4 },
	].map((bp) => {
		const imageArrays = Array.from(
			{ length: bp.columns },
			() => [] as ApiData.Country[]
		)
		for (let c = 0, i = 0; c < countries.length; c++, i++) {
			i = i > bp.columns - 1 ? 0 : i
			imageArrays[i].push(countries[c])
		}
		return { ...bp, images: imageArrays }
	})
	return columnArrays
}

export const filterCbs: tDrawerFilterGroup[] = [
	{
		group: 'For my livelihood, I...',
		items: [
			{
				label: 'Have a monthly income',
				dataKey: 'income' as unknown as keyof ApiData.ExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some(
						(p: ApiData.Pathway) => p.monthly_income == true
					) === true,
			},
			{
				label: 'Will need help to find a job',
				dataKey:
					'jobMarket' as unknown as keyof ApiData.ExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some((p) => p.job_required == false)
						=== true,
			},
			{
				label: 'Can work digitally from anywhere',
				dataKey:
					'digitalNomadVisa' as unknown as keyof ApiData.ExplorerFilters,
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
				dataKey: 'black' as unknown as keyof ApiData.ExplorerFilters,
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
					'disabilityAccess' as unknown as keyof ApiData.ExplorerFilters,
				matches: (country: ApiData.Country) => country && true,
			},
			{
				label: '18-30 years old',
				dataKey:
					'age18-30' as unknown as keyof ApiData.ExplorerFilters,
				matches: (country: ApiData.Country) =>
					country
					&& country.pathways?.some((p) => p.age_18_30 == true)
						=== true,
			},
			{
				label: '60+ years old',
				dataKey: 'age60+' as unknown as keyof ApiData.ExplorerFilters,
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
					'familyFriendly' as unknown as keyof ApiData.ExplorerFilters,
				matches: (country: ApiData.Country) => country && true,
			},
		],
	},
]

export const allFilters: Pick<
	tMasonryState['filters'][0],
	'key' | 'matches'
>[] = filterCbs.flatMap((group) =>
	group.items.map((item) => ({
		key: item.dataKey,
		matches: item.matches,
	}))
)
