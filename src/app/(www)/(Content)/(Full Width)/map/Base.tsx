'use client'

import { AnimatePresence, useDragControls } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useReducer, type Dispatch } from 'react'
import { cn } from '~/lib/cn'
import { DBContext } from '~/server/db/provider'
import {
	CountryHeading,
	FirstVisitOverlay,
	MapPathEl,
	mapReducer,
	MapSvg,
	Search,
	type tMapReducer,
} from '.'

const actionEnterExit = (
	e: EMouse<SVGPathElement>,
	mapDispatch: Dispatch<tMapReducer['action']>
) => {
	const target = e.currentTarget as SVGPathElement
	if (target.getAttribute('data-abb') != 'USA') {
		e.type == 'mouseenter' ?
			mapDispatch({
				type: 'countryHover',
				details: target.getAttribute('data-country')!,
			})
		:	mapDispatch({
				type: 'clearHover',
			})
	}
}

export const WorldMap = () => {
	const db = useContext(DBContext)
	const router = useRouter()
	const [mapState, mapDispatch] = useReducer(mapReducer, {
		hovered: null,
		selected: null,
		dragging: { first: false, current: false },
		boundaries: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
		hasVisited: true,
	})

	const hoveredCountry = db.countries?.find(
		country => country.name.toLowerCase() == mapState.hovered?.toLowerCase()
	)
	const dragControl = useDragControls()

	useEffect(() => {
		if (!localStorage.getItem('hasVisitedMap')) {
			localStorage.setItem('hasVisitedMap', 'true')
			mapDispatch({
				type: 'visitCookie',
			})
		}

		const handleResize = () => {
			mapDispatch({
				type: 'set-boundaries',
			})
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	if (!db.countries) return null

	return (
		<div
			id='map'
			className={cn(
				'fixed top-0 left-0 flex h-full max-h-screen w-full max-w-screen items-center justify-center overflow-hidden',
				mapState.dragging.current ? 'cursor-grabbing' : 'cursor-grab'
			)}>
			{!mapState.hasVisited && <FirstVisitOverlay draggingFirst={mapState.dragging.first} />}
			<AnimatePresence>
				<CountryHeading
					key={mapState.hovered || 'no-hover'}
					hoveredData={hoveredCountry}
				/>
			</AnimatePresence>
			<MapSvg
				drag
				dragControls={dragControl}
				dragMomentum={false}
				dragElastic={0.1}
				whileDrag={{ opacity: 0.5 }}
				onDragStart={() =>
					mapDispatch({
						type: 'dragStart',
					})
				}
				onDragEnd={() =>
					mapDispatch({
						type: 'dragEnd',
					})
				}
				dragConstraints={mapState.boundaries}>
				{db.getMapPaths().map(country => {
					const { svgPath, abbr, name } = country
					return (
						<MapPathEl
							key={name}
							name={name}
							abbr={abbr}
							svgPath={svgPath || ''}
							onMouseEnter={e => actionEnterExit(e, mapDispatch)}
							onMouseLeave={e => actionEnterExit(e, mapDispatch)}
							className={cn(
								'dark:stroke-background',
								abbr != 'USA' && 'hover:fill-brand-bright',
								'fill-red-500/20 transition-all'
							)}
							onClick={() => router.push(`/countries/${country.abbr.toLowerCase()}`)}
						/>
					)
				})}
			</MapSvg>
			<Search
				countries={db.getMapPaths()}
				actionSelected={country => router.push(`/countries/${country.abbr.toLowerCase()}`)}
			/>
		</div>
	)
}
