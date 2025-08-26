'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useContext, useEffect, useReducer, useRef } from 'react'
import { Checkbox, Heading, Icon, Label } from '~/components'
import { tDB, tExplorerFilters } from '~/server/db/db'
import { DBContext } from '~/server/db/provider'
import { Filter } from './Filter'
import { Masonry } from './Masonary'

type tMasonryState = {
	countries: tDB['countries']
	drawerOpen: boolean
	filters: Array<keyof tExplorerFilters>
	columns: Array<tDB['countries']>
	db: tDB
}

type tDrawerAction = {
	type: 'SET_DRAWER'
	payload?: null
}

type tFilterAction = {
	type: 'SET_FILTERS'
	payload: { key: keyof tExplorerFilters; value: boolean }
}

type tSetCountriesAction = {
	type: 'SET_COUNTRIES'
	payload: null
}

type tSetColumnsAction = {
	type: 'SET_COLUMNS'
	payload: Array<tDB['countries']>
}

export const breakpoints = [
	{ min: '320px', columns: 2 },
	{ min: '640px', columns: 3 },
	{ min: '1024px', columns: 4 },
] as {
	min?: string
	max?: string
	columns: number
}[]

const handleResize = (
	columns: Array<tDB['countries']>,
	countries: tDB['countries']
) => {
	let newColumns = columns?.length ?? 1
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

			if (
				globalThis.window.innerWidth >= min
				&& globalThis.window.innerWidth <= max
			) {
				newColumns = bp.columns
			}
		}
	}

	if (newColumns != columns.length) {
		const newColsArray = Array.from(
			{ length: newColumns },
			() => []
		) as tDB['countries'][]

		for (let i = 0, j = 0; i <= countries.length; i++, j++) {
			j = j >= newColumns ? 0 : j
			countries[i] && newColsArray[j].push(countries[i])
		}

		return [...newColsArray.filter((c) => c != undefined)]
	}
	return columns
}

const handleCountryFilter = (
	countries: tDB['countries'],
	filters: Array<keyof tExplorerFilters>,
	cb: (
		filters: Array<keyof tExplorerFilters>,
		country: tDB['countries'][number]
	) => boolean
) => {
	return countries.filter(
		(c) => c.images.havePhoto == true && cb(filters, c)
	)
}

const masonryReducer = (
	state: tMasonryState,
	action:
		| tDrawerAction
		| tFilterAction
		| tSetCountriesAction
		| tSetColumnsAction
) => {
	const newState = { ...state }
	const handleResize = () => {
		let newColumns = newState.columns?.length ?? 1
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

				if (
					globalThis.window.innerWidth >= min
					&& globalThis.window.innerWidth <= max
				) {
					newColumns = bp.columns
				}
			}
		}

		if (newColumns != newState.columns.length) {
			const newColsArray = Array.from(
				{ length: newColumns },
				() => []
			) as tDB['countries'][]

			for (
				let i = 0, j = 0;
				i <= newState.countries.length;
				i++, j++
			) {
				j = j >= newColumns ? 0 : j
				newState.countries[i]
					&& newColsArray[j].push(newState.countries[i])
			}

			return [...newColsArray.filter((c) => c != undefined)]
		}
		return newState.columns
	}

	if (action.type == 'SET_DRAWER') {
		Object.assign(newState, { drawerOpen: !state.drawerOpen })
	} else if (action.type == 'SET_FILTERS') {
		newState.filters.filter((f) => {
			if (Array.isArray(action.payload.key)) {
				return !action.payload.key.includes(f)
			}
			return f != action.payload.key
		})

		if (action.payload.value == true) {
			newState.filters.push(action.payload.key)
		}
		Object.assign(newState, {
			countries: handleCountryFilter(
				state.db.countries,
				newState.filters,
				state.db.filterByCommunities
			),
		})
		Object.assign(newState, {
			columns: handleResize(),
		})
	} else if (action.type == 'SET_COLUMNS') {
		Object.assign(newState, { columns: handleResize() })
	}

	return newState
}

export const Base = () => {
	const db = useContext(DBContext)
	const [reducer, dispatchReducer] = useReducer(masonryReducer, {
		countries: db.countries.filter((c) => c.images.havePhoto == true),
		drawerOpen: false,
		filters: [],
		columns: [] as Array<tDB['countries']>,
		db: db,
	})

	useEffect(() => {
		const updateSize = () =>
			dispatchReducer({
				type: 'SET_COLUMNS',
				payload: handleResize(reducer.columns, reducer.countries),
			})
		globalThis.window.addEventListener('resize', updateSize)
		updateSize()
		return () =>
			globalThis.window.removeEventListener('resize', updateSize)
	}, [reducer.columns, reducer.countries])

	const overlayRef = useRef<HTMLDivElement>(null)

	return (
		<div className='block h-full w-full px-4 pb-8'>
			<div className='relative my-4 flex w-[95%] items-center justify-between rounded-2xl bg-zinc-200 px-4 py-2 dark:bg-zinc-900'>
				<Heading
					size='2xl'
					className='mb-0 pb-0'>
					Explorer
				</Heading>
				<Filter
					count={Object.keys(reducer.filters).length}
					onClick={() => dispatchReducer({ type: 'SET_DRAWER' })}
				/>
			</div>
			<Masonry columns={reducer.columns} />
			<AnimatePresence>
				{reducer.drawerOpen && (
					<motion.div
						ref={overlayRef}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(e) =>
							e.target == overlayRef.current
							&& dispatchReducer({ type: 'SET_DRAWER' })
						}
						className='fixed inset-0 z-40 h-screen w-screen bg-black/30 backdrop-blur-sm'>
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{
								height: reducer.drawerOpen ? '300px' : '0px',
								opacity: 1,
							}}
							exit={{ height: 0, opacity: 0 }}
							transition={{
								type: 'spring',
							}}
							className='bg-card border-muted fixed right-0 bottom-0 left-0 z-50 w-screen rounded-t-2xl border-1 border-b-0 p-8 shadow-[0_-4px_8px_rgba(0,0,0,0.4)] backdrop-blur-md md:right-20 md:w-96'>
							<Heading size='lg'>Filter</Heading>
							<form>
								<Label>
									<Checkbox
										id='un'
										defaultChecked={reducer.filters.includes(
											'unMember'
										)}
										onCheckedChange={(checked) => {
											dispatchReducer({
												type: 'SET_FILTERS',
												payload: {
													key: 'unMember',
													value: checked === true,
												},
											})
										}}
									/>
									UN Member
								</Label>
								<Label>
									<Checkbox
										id='homophobia'
										defaultChecked={reducer.filters.includes(
											'prideScore'
										)}
										onCheckedChange={(checked) =>
											dispatchReducer({
												type: 'SET_FILTERS',
												payload: {
													key: 'prideScore',
													value: checked === true,
												},
											})
										}
									/>
									LGBTQIA+ Friendly
								</Label>
							</form>
							<Icon
								IconName='XIcon'
								className='absolute top-4 right-4 cursor-pointer'
								onClick={() =>
									dispatchReducer({ type: 'SET_DRAWER' })
								}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
