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
	| tMasonaryAction<'SET_COOKIES', tMasonryState['filters'][0]['key'][]>
	| tMasonaryAction<'SET_SEARCH', { query: string }>
	| tMasonaryAction<'INIT_FILTERS', null>

export type tDrawerFilter = {
	label: string
	dataKey: tMasonryState['filters'][0]['key']
} & Pick<tMasonryState['filters'][0], 'matches'>

export type tDrawerFilterGroup = {
	group: string
	items: tDrawerFilter[]
}
// #endregion ?
