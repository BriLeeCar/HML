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
import {
	Drawer,
	FilterBtn,
	handleColumns,
	Masonry,
	masonryReducer,
	tDocSizes,
} from '.'

const ExplorerPage = () => {
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
		const cookies = window.localStorage.getItem('explorer-filters')
		if (cookies) {
			try {
				const parsed = JSON.parse(cookies)
				if (Array.isArray(parsed)) {
					dispatchReducer({
						type: 'SET_COOKIES',
						payload: parsed,
					})
				}
			} catch (e) {
				console.error(
					'Error parsing explorer-filters from localStorage',
					e
				)
			}
		} else {
			window.localStorage.setItem('explorer-filters', '[]')
		}

		const updateSize = () => {
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
		<>
			<div className='relative mx-auto my-4 flex w-[95%] items-center justify-between rounded-2xl px-4 py-2'>
				<Heading size='2xl'>Explorer</Heading>
				<FilterBtn
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
		</>
	)
}

export default ExplorerPage
