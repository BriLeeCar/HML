import { AnimatePresence, motion, MotionProps } from 'motion/react'
import { ReactNode, useReducer } from 'react'
import { cn } from '~/cn'
import { Icon } from '~/components/Icon'
import { Button, Input } from '~/components/ui'
import { tCountryPaths } from './Map'

// #region ? TYPES
export type tCountry = {
	abbr: string
	name: string
	path: string
	tier: 0 | 1 | 2 | 3 | 999
	haveData: boolean
}

type tSearchState = {
	searchQuery: string
	isOpen: boolean
	countries: Array<tCountry>
}
type tSearchAction =
	| { type: 'toggle' }
	| { type: 'search'; query: string }
// #endregion ?

const searchReducer = (
	state: tSearchState,
	action: tSearchAction
) => {
	switch (action.type) {
		case 'toggle':
			return {
				...state,
				isOpen: !state.isOpen,
				searchQuery: '',
			}
		case 'search':
			return {
				...state,
				searchQuery: action.query || '',
			}
		default:
			return state
	}
}

export const Search = ({
	countries,
	actionSelected,
}: {
	countries: tCountryPaths
	actionSelected: (country: tCountryPaths[string]) => void
}) => {
	const [searchState, searchDispatch] = useReducer(searchReducer, {
		countries: Object.keys(countries).map((key) => {
			return {
				...countries[key],
				name: key,
			}
		}),
		searchQuery: '',
		isOpen: false,
	})

	const matchingCountries =
		searchState.searchQuery == '' ?
			[]
		:	searchState.countries.filter((country) =>
				country.name
					.toLowerCase()
					.includes(searchState.searchQuery.toLowerCase())
			)

	return (
		<span className={cn('fixed top-4 right-4 z-50 flex gap-2')}>
			<AnimatePresence>
				{searchState.isOpen && (
					<SearchInput>
						<Input
							type='text'
							className='bg-card'
							autoFocus
							onChange={(e) =>
								searchDispatch({
									type: 'search',
									query: e.target.value,
								})
							}
							placeholder='Search countries...'
						/>
						{searchState.searchQuery != '' && (
							<span
								key='search-results'
								className='mt-1 flex cursor-default flex-col gap-0.5 text-sm'>
								{matchingCountries.map((res) => (
									<SearchItem
										key={res.abbr}
										item={res}
										onClick={() => {
											actionSelected(res)
											searchDispatch({ type: 'toggle' })
										}}
									/>
								))}
							</span>
						)}
					</SearchInput>
				)}
			</AnimatePresence>
			<Btn
				onClick={() => {
					searchDispatch({ type: 'toggle' })
				}}
			/>
		</span>
	)
}

const Btn = ({ ...props }) => {
	return (
		<Button
			{...props}
			type='button'
			size='icon'>
			<Icon
				IconName='SearchIcon'
				className='h-5 w-5'
			/>
			<span className='sr-only'>Toggle Search Drawer</span>
		</Button>
	)
}

const SearchInput = ({
	children,
}: {
	children: ReactNode | ReactNode[]
}) => {
	return (
		<motion.span
			key='search-input'
			initial={{
				width: 0,
			}}
			exit={{
				width: 0,
			}}
			animate={{
				width: 'auto',
				transition: { duration: 0.3 },
			}}>
			{children}
		</motion.span>
	)
}

const SearchItem = ({
	item,
	...props
}: Props<'button'> & MotionProps & { item: tCountry }) => {
	return (
		<motion.button
			{...props}
			layout
			initial={{ height: 0 }}
			animate={{ height: 'auto' }}
			exit={{ height: 0 }}
			className={cn(
				'bg-card click border-border block overflow-hidden rounded-sm border-1 px-2 py-1 hover:brightness-90',
				item.tier == 1 && 'text-accent-primary'
			)}>
			{item.name}
		</motion.button>
	)
}
