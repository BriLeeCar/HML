'use client'

import { motion } from 'motion/react'
import { Heading } from '~/components/Text/Heading'
import { cn } from '~/lib/cn'

export const CountryHeading = ({ hoveredData }: { hoveredData: ApiData.Country | undefined }) => {
	return (
		<span className='absolute bottom-0 left-0 z-10 flex w-full max-w-[75vw] items-center rounded-r-lg in-[body:has(#urgentBanner)]:bottom-15 pointer-coarse:hidden'>
			<aside className='block max-w-142.5 select-none'>
				<motion.hgroup
					className='backdrop-blur-[1px]'
					id={hoveredData?.abbr || 'default'}
					key={hoveredData?.abbr || 'default'}
					animate={{ opacity: 1, translateX: 0 }}
					initial={{ opacity: 0, translateX: '-100%' }}
					exit={{ opacity: 0, translateX: '-100vh' }}>
					<Heading
						className={cn(
							'text-foreground/70 shadow-background flex w-full items-baseline gap-3 border-0 px-6 not-italic text-shadow-sm',
							!hoveredData && 'font-normal text-zinc-700 italic opacity-50 dark:text-zinc-400'
						)}
						size='2xl'>
						{hoveredData?.name ?? 'Hover over a country'}
					</Heading>
				</motion.hgroup>
			</aside>
		</span>
	)
}
