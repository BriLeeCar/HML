import { AnimatePresence, motion } from 'motion/react'
import { cn } from '~/cn'
import { Heading } from '~/components/Heading'
import { CountryStore } from '~/data/stores/countryStore'

export const CountryHeading = ({
	hovered,
	hoveredData,
}: {
	hovered: string | null
	hoveredData: CountryStore['countries'][number] | null
}) => {
	return (
		<AnimatePresence initial={false}>
			<span className='absolute bottom-10 left-0 z-10 flex w-full max-w-[75vw] items-center rounded-r-lg'>
				<aside className='block max-w-[570px] select-none'>
					<motion.hgroup
						layout
						layoutCrossfade={false}
						layoutDependency={hovered}
						key={hoveredData?.abbr || 'default'}
						animate={{ opacity: 1, translateX: 0 }}
						initial={{ opacity: 0, translateX: '100%' }}
						exit={{ opacity: 0, translateX: '-100vh' }}>
						<Heading
							className={cn(
								'text-foreground/70 shadow-background flex w-full items-baseline gap-3 border-0 px-6 not-italic text-shadow-sm'
							)}
							size='xl'>
							{hovered ? hovered : 'Hover over a country'}
							{hoveredData
								&& [1, 2, 3].includes(
									hoveredData.tier ? hoveredData.tier : 0
								) && (
									<span
										className={cn(
											'block grow text-end text-2xl font-bold italic',
											hoveredData.tier == 1 && 'text-accent-primary'
										)}>
										tier {hoveredData?.tier}
									</span>
								)}
						</Heading>
						<p className='px-12 text-sm font-semibold text-zinc-400 italic'>
							{hoveredData ?
								hoveredData.haveData && hoveredData.abbr != 'US' ?
									'click for more information'
								:	'no data available'
							:	''}
						</p>
					</motion.hgroup>
				</aside>
			</span>
		</AnimatePresence>
	)
}
