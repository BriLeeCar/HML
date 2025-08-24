'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IconAttributes } from '~/components/Country/IconAttributes'
import { Heading } from '~/components/Heading'
import { tPhotoCountry } from './page'

export const Masonry = ({
	countries,
}: {
	countries: Array<tPhotoCountry>
}) => {
	const [columns, setColumns] = useState([[]] as Array<
		tPhotoCountry[]
	>)

	const breakpoints = [
		{ min: '320px', columns: 2 },
		{ min: '640px', columns: 3 },
		{ min: '1024px', columns: 4 },
	] as {
		min?: string
		max?: string
		columns: number
	}[]

	useEffect(() => {
		const updateSize = () => {
			let newColumns = columns.length
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

					if (window.innerWidth >= min && window.innerWidth <= max) {
						newColumns = bp.columns
					}
				}
			}

			if (newColumns != columns.length) {
				const newColsArray = Array.from(
					{ length: newColumns },
					() => []
				) as Array<tPhotoCountry[]>

				for (let i = 0, j = 0; i <= countries.length; i++, j++) {
					j = j >= newColumns ? 0 : j
					countries[i] && newColsArray[j].push(countries[i])
				}

				setColumns([...newColsArray.filter((c) => c !== undefined)])
			}
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [countries, columns.length])

	return (
		<motion.div
			layoutRoot
			className='flex w-full shrink justify-between gap-4 md:gap-0'>
			<AnimatePresence>
				{columns.map((col, i) => {
					return (
						<div
							key={`columns${i}`}
							className='flex max-w-1/2 grow basis-0 flex-col sm:max-w-[31vw] lg:max-w-[23vw]'>
							{col.map((c, i) => {
								const priority = i < 4 && c.unsplash ? true : false
								return (
									<motion.div
										layoutDependency={col.length}
										layout='size'
										initial={{ height: 0, marginBottom: 0 }}
										animate={{ height: 'auto', marginBottom: '1rem' }}
										exit={{ height: 0, marginBottom: 0 }}
										style={{
											breakInside: 'avoid',
										}}
										transition={{
											type: 'spring',
										}}
										key={c.abbr}
										className='bg-background outline-card-foreground/5 flex h-auto w-full max-w-full basis-full flex-col rounded-lg outline-1'>
										<Item
											country={c}
											key={c.abbr}
											priority={priority}
										/>
									</motion.div>
								)
							})}
						</div>
					)
				})}
			</AnimatePresence>
		</motion.div>
	)
}

const Item = ({
	country,
	priority,
}: {
	country: tPhotoCountry
	priority: boolean
}) => {
	return (
		<>
			<figure
				style={{
					aspectRatio: `${country.unsplash.width} / ${country.unsplash.height}`,
				}}
				className='relative flex w-auto shrink overflow-hidden rounded-t-lg px-0 pt-0'>
				<Image
					src={country.unsplash.urls.regular + '&dpr=3&auto=format'}
					alt={country.unsplash.alt_description ?? ''}
					fill
					style={{
						objectFit: 'cover',
						objectPosition: 'center center',
					}}
					sizes={`20vw`}
					className='h-full w-auto'
					priority={priority}
				/>
				<figcaption className='absolute right-0 bottom-0 z-20 w-full bg-black/35 px-2 py-1 text-end font-mono text-[.5rem] text-white uppercase underline decoration-current/30 underline-offset-2 text-shadow-2xs text-shadow-black/20 hover:decoration-current'>
					<Link
						href={country.unsplash.user.links.html}
						target='_blank'
						rel='noopener noreferrer'>
						Photo By {country.unsplash.user.name} on Unsplash
					</Link>
				</figcaption>
			</figure>
			<section className='relative px-4 pt-2 pb-4'>
				<span className='flex flex-col justify-between gap-1 md:flex-row md:items-center-safe'>
					<Heading
						size='md'
						className='mt-0 mb-0 basis-1/2 border-0 pb-0 font-sans font-bold'>
						{country.name}
					</Heading>
					<span className='shrink'>
						<IconAttributes
							country={country}
							className='justify-start'
						/>
					</span>
				</span>
			</section>
		</>
	)
}
