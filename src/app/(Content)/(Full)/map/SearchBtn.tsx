import { AnimatePresence, motion, MotionProps } from 'motion/react'
import { ReactNode, useReducer } from 'react'
import { Button, Icon, Input } from '~/components'
import { cn } from '~/lib/cn'
import { type tDB } from '~/server/db/db'

// #region ? TYPES

type tSearchState = {
	searchQuery: string
	isOpen: boolean
	countries: tDB['countries']
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
	countries: tDB['countries']
	actionSelected: (country: tDB['countries'][number]) => void
}) => {
	const [searchState, searchDispatch] = useReducer(searchReducer, {
		countries: countries.map((country) => {
			return {
				...country,
				name: country.name?.replace(/ \(.+\)/, ''),
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
		<span
			className={cn(
				'fixed right-4 bottom-4 z-50 flex items-end gap-2'
			)}>
			<AnimatePresence>
				{searchState.isOpen && (
					<SearchInput>
						{searchState.searchQuery != '' && (
							<span
								key='search-results'
								className='mb-2 flex cursor-default flex-col gap-0.5 text-sm'>
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
						<Input
							type='text'
							className='bg-card'
							autoFocus
							onChange={(e) => {
								searchDispatch({
									type: 'search',
									query: e.target.value,
								})
							}}
							placeholder='Search countries...'
						/>
					</SearchInput>
				)}
			</AnimatePresence>
			<Btn
				onClick={() => {
					searchDispatch({ type: 'toggle' })
				}}
				className='border-1 border-current/10'
			/>
		</span>
	)
}

const Btn = ({ ...props }) => {
	return (
		<Button
			{...props}
			variant={'ghost'}
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
}: Props<'button'>
	& MotionProps & { item: tDB['countries'][number] }) => {
	return (
		<motion.button
			{...props}
			layout
			initial={{ height: 0 }}
			animate={{ height: 'auto' }}
			exit={{ height: 0 }}
			className={cn(
				'bg-muted click border-border block overflow-hidden rounded-sm border-1 px-2 py-1 hover:brightness-90',
				item.tier == 'now' && 'font-bold text-red-400'
			)}>
			{item.name}
		</motion.button>
	)
}
