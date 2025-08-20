'use client'

import { motion, useDragControls } from 'motion/react'
import { redirect } from 'next/navigation'
import { useEffect, useReducer } from 'react'
import { cn } from '~/cn'
import { Icon } from '~/components/Icon'
import { tCountryRest } from '~/data/baseCountryApi'
import { getCountriesWithData } from '~/data/getCountriesWithData'
import countryPaths from '~/data/mapPathData.json'
import { CountryHeading } from './Heading'
import { Map, Path, tCountryPaths } from './Map'
import { Search } from './SearchBtn'

// #region ? TYPES
type tMapState = {
	hovered: string | null
	selected: string | null
	inViewCountries: string[]
	dragging: { first: boolean; current: boolean }
	boundaries: Record<string, number>
	hasVisited: boolean
}

type tMapAction =
	| {
			type: 'visited'
			details: { country: string; inView: boolean }
	  }
	| {
			type: 'set-boundaries'
	  }
	| { type: 'visitCookie' }
	| { type: 'countryHover'; details: string }
	| { type: 'clearHover' }
	| {
			type: 'setDragging'
			details: { first: boolean; current: boolean }
	  }
	| {
			type: 'selected'
			details?: string | null
	  }
// #endregion ?

const mapReducer = (state: tMapState, action: tMapAction) => {
	if (action.type) {
		switch (action.type) {
			case 'visited':
				const {
					country,
					inView,
				}: { country: string; inView: boolean } = action.details

				if (
					(inView && state.inViewCountries.includes(country))
					|| (!inView && !state.inViewCountries.includes(country))
				) {
					return state
				}
				const newInViewCountries = state.inViewCountries.filter(
					(c) => c != country
				)
				if (!inView) {
					return {
						...state,
						inViewCountries: newInViewCountries,
					}
				}

				return {
					...state,
					inViewCountries: [...newInViewCountries, country]
						.filter((ea) => ea)
						.sort(),
				}
			case 'selected':
				return {
					...state,
				}
			case 'set-boundaries':
				const rect = document
					.querySelector('#worldMap')
					?.getBoundingClientRect()
				if (!rect) return state
				if (
					-rect.right + rect.left + window.innerWidth
					!= state.boundaries.left
				) {
					return {
						...state,
						boundaries: {
							top: 0,
							bottom: 0,
							left: -rect.right + rect.left + window.innerWidth,
							right: 0,
						},
					}
				}
				return state
			case 'visitCookie':
				return {
					...state,
					hasVisited: false,
				}
			case 'countryHover':
				return {
					...state,
					hovered: action.details as string,
				}
			case 'clearHover':
				return {
					...state,
					hovered: null,
				}
			case 'setDragging':
				return {
					...state,
					dragging: action.details,
				}
		}
	}

	return state
}

export const WorldMap = ({
	countriesWithData,
}: {
	countriesWithData: { [key: string]: tCountryRest }
}) => {
	const [mapState, mapDispatch] = useReducer(mapReducer, {
		hovered: null,
		selected: null,
		inViewCountries: [],
		dragging: { first: false, current: false },
		boundaries: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
		hasVisited: true,
	})

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

	const handleInView = (country: string, inView: boolean) => {
		mapDispatch({
			type: 'visited',
			details: {
				country,
				inView,
			},
		})
	}

	const dragControl = useDragControls()

	const handleSelected = (country: string) => {
		redirect(`/countries/${country}`)
	}

	if (!countriesWithData) return null

	return (
		<div
			className={cn(
				'flex h-full w-full max-w-screen items-center justify-center overflow-hidden',
				mapState.dragging.current ? 'cursor-grabbing' : 'cursor-grab'
			)}>
			{!mapState.hasVisited && (
				<motion.div
					initial={{ opacity: 1, display: 'flex' }}
					animate={{
						opacity: 0,
						display: 'none',
						transition: { delay: 3 },
					}}
					className={cn(
						mapState.dragging.first ?
							'cursor-grabbing'
						:	'cursor-grab',
						'bg-background/45 absolute top-0 right-0 bottom-0 left-0 z-100 flex items-center justify-center text-4xl font-bold uppercase'
					)}>
					<motion.span
						className='flex max-w-screen items-center justify-around gap-2'
						initial={{
							translateX: 0,
						}}
						animate={{
							translateX: [0, -100, 0, 100, 0, 0],
							opacity: [1, 0.5, 1, 0.5, 1, 0],
							transition: {
								delay: 0.5,
								duration: 2,
							},
						}}>
						<Icon
							IconName='ArrowRightIcon'
							className='h-full w-auto origin-left scale-300 rotate-180'
						/>
						<span className='block w-2/3 text-center'>
							Drag to move the map
						</span>
						<Icon
							IconName='ArrowRightIcon'
							className='origin-left scale-300'
						/>
					</motion.span>
				</motion.div>
			)}
			<CountryHeading
				countriesWithData={countriesWithData}
				hovered={mapState.hovered}
				hoveredData={
					mapState.hovered ?
						countryPaths[
							mapState.hovered as keyof typeof countryPaths
						]
					:	null
				}
			/>
			<Map
				drag
				dragControls={dragControl}
				dragMomentum={false}
				dragElastic={0.1}
				whileDrag={{ opacity: 0.5 }}
				onDragStart={() =>
					mapDispatch({
						type: 'setDragging',
						details: {
							first: true,
							current: true,
						},
					})
				}
				onDragEnd={() =>
					mapDispatch({
						type: 'setDragging',
						details: {
							first: true,
							current: false,
						},
					})
				}
				dragConstraints={mapState.boundaries}>
				{Object.keys(countryPaths).map((countryName) => {
					const { path, tier, haveData, abbr } = countryPaths[
						countryName as keyof typeof countryPaths
					] as tCountryPaths[string]
					return (
						<Path
							key={countryName}
							name={countryName}
							abb={abbr}
							tier={tier}
							haveData={haveData}
							path={path}
							onMouseEnter={() =>
								mapDispatch({
									type: 'countryHover',
									details: countryName,
								})
							}
							onMouseLeave={() =>
								mapDispatch({
									type: 'clearHover',
								})
							}
							handleInView={handleInView}
							canClick={
								haveData && tier !== 999 && !mapState.dragging.current
							}
						/>
					)
				})}
			</Map>
			<Search
				countries={getCountriesWithData()}
				actionSelected={handleSelected}
			/>
		</div>
	)
}
