'use client'

import { AnimatePresence } from 'motion/react'
import {
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react'
import { Heading } from '~/components'
import { DBContext } from '~/server/db/provider'
import { Filter } from './Filter'
import { Drawer } from './FilterDrawer'
import { Masonry } from './Masonary'
import { masonryReducer } from './reducer'
import { handleColumns, tDocSizes } from './util'

export const Base = () => {
	const db = useContext(DBContext)
	const [docSizes, setDocSizes] = useState<tDocSizes>({
		screenWidth: 0,
		containerWidth: 0,
	})
	const [reducer, dispatchReducer] = useReducer(masonryReducer, {
		countries: db.countries.filter((c) => c.images.havePhoto == true),
		drawerOpen: false,
		filters: [],
		db: db,
	})

	useEffect(() => {
		const updateSize = () => {
			console.log({
				screenWidth: globalThis.window.innerWidth,
				containerWidth:
					document
						.querySelector('#masonaryWrapper')
						?.getBoundingClientRect().width || 0,
			})
			setDocSizes({
				screenWidth: globalThis.window.innerWidth,
				containerWidth:
					document
						.querySelector('#masonaryWrapper')
						?.getBoundingClientRect().width || 0,
			})
		}
		globalThis.window.addEventListener('resize', updateSize)
		updateSize()
		return () =>
			globalThis.window.removeEventListener('resize', updateSize)
	}, [])

	const overlayRef = useRef<HTMLDivElement>(null)
	const masonryRef = useRef<HTMLDivElement>(null)

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
			<AnimatePresence>
				<Masonry
					key={reducer.countries.length}
					columns={handleColumns(docSizes, reducer)}
					ref={masonryRef}
					colWidth={docSizes.containerWidth}
				/>
				{reducer.drawerOpen && (
					<Drawer
						key='drawerComponent'
						overlayRef={overlayRef}
						dispatchReducer={dispatchReducer}
						reducer={reducer}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
