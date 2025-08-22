'use client'

import { motion, useDragControls } from 'motion/react'
import { redirect } from 'next/navigation'
import { useEffect, useReducer } from 'react'
import { cn } from '~/cn'
import { Icon } from '~/components/Icon'
import { type zodCountryRest } from '~/data/baseCountryApi'
import mapData from '~/data/countryDataWithPaths.json'
import { useCountryStore } from '~/data/stores/countryStore'
import { CountryHeading } from './Heading'
import { MapPathEl, MapSvg } from './Map'
import { mapReducer } from './Reducer'
import { Search } from './SearchBtn'
import type { tCountryKeys, tCountryPathData } from './util'

const redirectLink = (country: Omit<tCountryPathData, 'path'>) => {
	return `/countries/${country.abbr.toLowerCase()}`
}
export const WorldMap = ({
	countriesWithData,
}: {
	countriesWithData: { [key: string]: zodCountryRest }
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

	const store = useCountryStore()
	mapData.forEach((country) => {
		if (!country.abbr) return
		store.verifyCountry(country.abbr.toLowerCase())
	})

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

	const handleSelected = (country: tCountryPathData) => {
		redirect(redirectLink(country))
	}

	if (!countriesWithData) return null

	return (
		<div
			id='map'
			className={cn(
				'fixed top-0 left-0 flex h-full max-h-screen w-full max-w-screen items-center justify-center overflow-hidden',
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
				hovered={mapState.hovered}
				hoveredData={
					mapState.hovered ?
						store.countries.find((c) => c.abbr === mapState.hovered)
						|| null
					:	null
				}
			/>
			<MapSvg
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
				{mapData
					.filter((ea) => ea.path)
					.map((country) => {
						const { path, tier, haveData, abbr, name } = country
						return (
							<MapPathEl
								key={name}
								name={name as tCountryKeys}
								abbr={abbr}
								tier={(tier as tCountryPathData['tier']) ?? 0}
								haveData={haveData ?? false}
								path={path || ''}
								onMouseEnter={() =>
									mapDispatch({
										type: 'countryHover',
										details: name!,
									})
								}
								onMouseLeave={() =>
									mapDispatch({
										type: 'clearHover',
									})
								}
								handleInView={handleInView}
								canClick={tier !== 999 && !mapState.dragging.current}
							/>
						)
					})}
			</MapSvg>
			<Search
				countries={store.countries.filter((ea) => ea.path)}
				actionSelected={handleSelected}
			/>
		</div>
	)
}
