'use client'

import { motion } from 'motion/react'
import { cn } from '~/cn'
import { Heading } from '~/components/Heading'
import { tCountry } from '~/data/stores/countryStore'
// import { CountryStore } from '~/data/stores/countryStore'

export const CountryHeading = ({
	hovered,
	hoveredData,
}: {
	hovered: string | null
	hoveredData: tCountry | null
}) => {
	return (
		<span className='absolute bottom-0 left-0 z-10 flex w-full max-w-[75vw] items-center rounded-r-lg'>
			<aside className='block max-w-[570px] select-none'>
				<motion.hgroup
					className='backdrop-blur-[1px]'
					id={hoveredData?.name || 'default'}
					key={hoveredData?.abbr || 'default'}
					animate={{ opacity: 1, translateX: 0 }}
					initial={{ opacity: 0, translateX: '-100%' }}
					exit={{ opacity: 0, translateX: '-100vh' }}>
					<Heading
						className={cn(
							'text-foreground/70 shadow-background flex w-full items-baseline gap-3 border-0 px-6 not-italic text-shadow-sm',
							!hovered
								&& 'font-normal text-zinc-700 italic opacity-50 dark:text-zinc-400'
						)}
						size='xl'>
						{hovered ? hovered : 'Hover over a country'}
						{hoveredData && hoveredData.tier != 'None' && (
							<span
								className={cn(
									'block grow text-end text-2xl font-bold italic',
									hoveredData.tier == 'now' && 'text-accent-primary'
								)}>
								tier {hoveredData?.tier}
							</span>
						)}
					</Heading>
					<p className='px-12 text-sm font-semibold text-zinc-400 italic'>
						{hoveredData ?
							hoveredData.tier != 'None' ?
								'click for more information'
							:	'no data available'
						:	''}
					</p>
				</motion.hgroup>
			</aside>
		</span>
	)
}
