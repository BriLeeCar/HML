'use client'

import { AnimatePresence } from 'motion/react'
import {
	Suspense,
	useContext,
	useEffect,
	useReducer,
	useRef,
} from 'react'
import { PageHeading } from '~/components'
import { DBContext } from '~/server/db/provider'
import {
	Drawer,
	FilterBtn,
	handleColumns,
	Masonry,
	masonryReducer,
} from '.'

export const Base = () => {
	const db = useContext(DBContext)

	const [reducer, dispatchReducer] = useReducer(masonryReducer, {
		countries: [],
		drawer: { status: false, size: '' },
		filters: [],
		db: db,
		search: {
			query: '',
		},
	})

	useEffect(() => {
		const cookies = window.localStorage.getItem('explorer-filters')
		if (cookies) {
			try {
				const parsed = JSON.parse(cookies)
				if (Array.isArray(parsed) && parsed.length > 0) {
					dispatchReducer({
						type: 'SET_COOKIES',
						payload: parsed,
					})
				} else {
					dispatchReducer({ type: 'SET_COUNTRIES' })
				}
			} catch (e) {
				console.error(
					'Error parsing explorer-filters from localStorage',
					e
				)
			}
		} else {
			window.localStorage.setItem('explorer-filters', '[]')
			dispatchReducer({ type: 'SET_COUNTRIES' })
		}
	}, [])

	const overlayRef = useRef<HTMLDivElement>(null)
	const masonryRef = useRef<HTMLDivElement>(null)
	return (
		<>
			<div className='relative mx-auto my-4 flex w-[95%] flex-col items-center justify-between rounded-2xl px-4 py-2 sm:flex-row'>
				<PageHeading
					subtitle={
						<>
							Use a combination of the filters and some of the visual
							clues on the country cards to help narrow down your
							search!
						</>
					}
					eyebrow='Visa Explorer'>
					Explorer
				</PageHeading>
				<span className='flex items-center justify-start gap-4'>
					<FilterBtn
						className='hidden md:inline-flex'
						count={Object.keys(reducer.filters).length}
						onClick={() =>
							dispatchReducer({
								type: 'SET_DRAWER',
								payload: {
									size: 'md',
								},
							})
						}
					/>{' '}
					<FilterBtn
						className='md:hidden'
						count={Object.keys(reducer.filters).length}
						onClick={() =>
							dispatchReducer({
								type: 'SET_DRAWER',
								payload: {
									size: 'sm',
								},
							})
						}
					/>
				</span>
			</div>
			<Suspense
				fallback={<div className='text-center'>Loading...</div>}>
				<Masonry
					key={reducer.countries.length}
					columns={handleColumns(reducer)}
					ref={masonryRef}
				/>
			</Suspense>
			<AnimatePresence>
				{reducer.drawer.status && (
					<Drawer
						key='drawerComponent'
						overlayRef={overlayRef}
						dispatchReducer={dispatchReducer}
						reducer={reducer}
					/>
				)}
			</AnimatePresence>
		</>
	)
}
