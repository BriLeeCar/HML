'use client'

import { motion, useDragControls } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '~/cn'
import { Icon } from '~/components/Icon'
import { tCountryRest } from '~/data/baseCountryApi'
import countryPaths from '~/data/mapPathData.json'
import { CountryHeading } from './Heading'
import { Map, Path, tCountryPaths } from './Map'

export const WorldMap = ({
	countriesWithData,
}: {
	countriesWithData: { [key: string]: tCountryRest }
}) => {
	const [hovered, setHovered] = useState<string | null>(null)
	const [inViewCountries, setInViewCountries] = useState<string[]>([])
	const [dragging, setDragging] = useState({
		first: false,
		current: false,
	})
	const [boundaries, setBoundaries] = useState<{
		[key: string]: number
	}>({
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	})

	useEffect(() => {
		const handleResize = () => {
			const rect = document
				.querySelector('#worldMap')
				?.getBoundingClientRect()
			if (rect) {
				setBoundaries({
					top: 0,
					bottom: 0,
					left: window.innerWidth - rect.right,
					right: 0,
				})
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const dragged = {
		controls: useDragControls(),
	}

	const inView = {
		handle: (country: string, inView: boolean) => {
			if (
				(inViewCountries.includes(country) && inView)
				|| (!inViewCountries.includes(country) && !inView)
			) {
				return
			}
			const tempList = [...inViewCountries].filter(
				(c) => c !== country
			)

			if (inView) {
				setInViewCountries([...tempList, country].sort())
			} else {
				setInViewCountries(tempList)
			}
		},
	}

	if (!countriesWithData) return null

	return (
		<div
			className={cn(
				'flex h-full w-full max-w-screen items-center justify-center overflow-hidden',
				dragging.current ? 'cursor-grabbing' : 'cursor-grab'
			)}>
			<motion.div
				initial={{ opacity: 1, display: 'flex' }}
				animate={{
					opacity: 0,
					display: 'none',
					transition: { delay: 3 },
				}}
				className={cn(
					dragging.first ? 'cursor-grabbing' : 'cursor-grab',
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
			<CountryHeading
				countriesWithData={countriesWithData}
				hovered={hovered}
				hoveredData={
					hovered ?
						countryPaths[hovered as keyof typeof countryPaths]
					:	null
				}
			/>
			<Map
				drag
				dragControls={dragged.controls}
				dragMomentum={false}
				dragElastic={0.1}
				whileDrag={{ opacity: 0.5 }}
				onDragStart={() =>
					setDragging({
						first: true,
						current: true,
					})
				}
				onDragEnd={() =>
					setDragging({
						first: true,
						current: false,
					})
				}
				dragConstraints={boundaries}>
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
							onMouseEnter={() => setHovered(countryName)}
							onMouseLeave={() => setHovered(null)}
							handleInView={inView.handle}
							canClick={haveData && tier !== 999 && !dragging.current}
						/>
					)
				})}
			</Map>
		</div>
	)
}
