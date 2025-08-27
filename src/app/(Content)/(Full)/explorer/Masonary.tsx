'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { RefObject, useContext } from 'react'
import { Heading, TouchTarget } from '~/components'
import { IconAttributes } from '~/components/Country/IconAttributes'
import { cn } from '~/lib/cn'
import { tCountry, tDB } from '~/server/db/db'
import { DBContext } from '~/server/db/provider'

export const Masonry = ({
	columns,
	ref,
	colWidth,
}: {
	columns: tCountry[][]
	ref: RefObject<HTMLDivElement | null>
	colWidth?: number
}) => {
	const db = useContext(DBContext)
	const cols =
		(colWidth || 300) / columns.length
		- Math.ceil(columns.length / 2) * 4

	return (
		<motion.div
			id='masonaryWrapper'
			layoutRoot
			key={`masonry-${columns.length}`}
			ref={ref}
			className='flex w-full shrink basis-full gap-4 md:max-w-[calc(100vw-2rem)] md:justify-between md:gap-0'>
			{columns.map((col, i) => {
				return (
					<div
						style={{
							flexBasis: `${cols}px`,
							maxWidth: `${cols}px`,
						}}
						key={`columns${i}`}
						className='flex shrink basis-auto flex-col'>
						{col.map((c: tCountry, i) => {
							const priority = i < 4 ? true : false
							return (
								<motion.div
									layoutDependency={col.length}
									layout='preserve-aspect'
									initial={{ height: 0, marginBottom: 0 }}
									animate={{ height: 'auto', marginBottom: '1rem' }}
									exit={{ height: 0, marginBottom: 0 }}
									style={{
										breakInside: 'avoid',
									}}
									transition={{
										type: 'spring',
										damping: 10,
									}}
									key={c.abbr}
									className='bg-background outline-card-foreground/5 inline-flex h-auto w-full max-w-full shrink basis-full flex-col rounded-lg outline-1'>
									<MasonryCountry
										country={c}
										key={c.abbr}
										priority={priority}
										db={db}
									/>
								</motion.div>
							)
						})}
					</div>
				)
			})}
		</motion.div>
	)
}

const MasonryCountry = ({
	country,
	priority,
	db,
}: {
	country: tCountry
	priority: boolean
	db: tDB
}) => {
	return (
		<>
			<figure
				style={{
					aspectRatio: `${country.images.width} / ${country.images.height}`,
				}}
				className='relative inline-flex w-full shrink overflow-hidden rounded-t-lg px-0 pt-0 has-[+section_a:hover]:*:[img]:contrast-110 has-[+section_a:hover]:*:[img]:grayscale-100'>
				<Image
					src={
						'/countries/'
						+ (country.images.havePhoto == true ?
							country.name.toLowerCase()
						:	'placeholder')
						+ '.jpeg'
					}
					alt={`Photograph showing life in ${country.name}`}
					fill
					style={{
						objectFit: 'cover',
						objectPosition: 'center center',
					}}
					sizes={`20vw`}
					className={cn('h-full w-auto transition-all')}
					priority={priority}
				/>
				<figcaption className='absolute right-0 bottom-0 z-20 w-full bg-black/35 px-2 py-1 text-end font-mono text-[.5rem] text-white uppercase underline decoration-current/30 underline-offset-2 text-shadow-2xs text-shadow-black/20 hover:decoration-current'>
					<Link
						href={'https://unsplash.com/@' + country.images.handle}
						target='_blank'
						rel='noopener noreferrer'>
						Photo By {country.images.name} on Unsplash
					</Link>
				</figcaption>
			</figure>
			<section className='relative px-4 pt-2 pb-4'>
				<span className='relative flex flex-col justify-between gap-1 md:flex-row md:items-center-safe'>
					<Link
						href={`/countries/${country.abbr.toLowerCase()}`}
						title={country.name}
						className='underline hover:decoration-current/50'>
						<TouchTarget>
							<Heading
								size='md'
								className='mt-0 mb-0 basis-1/2 border-0 pb-0 font-sans font-bold'>
								{country.name}
							</Heading>
						</TouchTarget>
					</Link>
					<span className='shrink'>
						<IconAttributes
							attr={db.getCommunityAttributes(country)}
							className='justify-start'
						/>
					</span>
				</span>
			</section>
		</>
	)
}
