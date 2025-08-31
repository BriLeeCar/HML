import { AnimatePresence, motion, MotionProps } from 'motion/react'
import { ReactNode, useReducer } from 'react'
import { Button, Icon, Input } from '~/components'
import { cn } from '~/lib/cn'
import { DB, type tDB } from '~/server/db/db'

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
	onSelected,
	onQueryChange,
	withDropdown = true,
	currentQuery = '',
	...props
}: {
	countries: DB['countries']
	onSelected?: (country: tDB['countries'][number]) => void
	onQueryChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	currentQuery?: string
	withDropdown?: boolean
} & Props<'input'>) => {
	const [searchState, searchDispatch] = useReducer(searchReducer, {
		countries: countries.map((country) => {
			return {
				...country,
				name: country.name?.replace(/ \(.+\)/, ''),
			}
		}),
		searchQuery: currentQuery,
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
		<span className={cn('flex items-end gap-2')}>
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
											onSelected && onSelected(res)
											searchDispatch({ type: 'toggle' })
										}}
									/>
								))}
							</span>
						)}
						<Input
							{...props}
							type='text'
							className='bg-card'
							autoFocus
							defaultValue={currentQuery || undefined}
							onBlur={() => {
								searchDispatch({ type: 'toggle' })
							}}
							onChange={(e) => {
								if (withDropdown) {
									searchDispatch({
										type: 'search',
										query: e.target.value,
									})
								}
								onQueryChange && onQueryChange(e)
							}}
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
		<>
			<Button
				{...props}
				variant={'ghost'}
				type='button'
				size='icon'
				className={cn(
					'lg:hidden',
					'rounded-md bg-red-800 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap text-white shadow-xs hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400 dark:focus-visible:outline-zinc-500'
				)}>
				<Icon
					IconName='SearchIcon'
					className='h-5 w-5'
				/>{' '}
				<span className='sr-only'>Toggle Search Drawer</span>
			</Button>
			<Button
				{...props}
				type='button'
				className={cn(
					'hidden lg:flex',
					'rounded-md bg-red-800 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap text-white shadow-xs hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400 dark:focus-visible:outline-zinc-500'
				)}>
				<Icon
					IconName='SearchIcon'
					className='h-5 w-5'
				/>{' '}
				SEARCH
				<span className='sr-only'>Toggle Search Drawer</span>
			</Button>
		</>
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
	& MotionProps & { item: DB['countries'][number] }) => {
	return (
		<motion.button
			{...props}
			layout
			initial={{ height: 0 }}
			animate={{ height: 'auto' }}
			exit={{ height: 0 }}
			className={cn(
				'bg-muted click border-border block overflow-hidden rounded-sm border-1 px-2 py-1 hover:brightness-90'
			)}>
			{item.name}
		</motion.button>
	)
}
