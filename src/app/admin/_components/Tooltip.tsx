import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'

export const Tooltip = ({ target, children }: { target: ReactNode; children: ReactNode }) => {
	return (
		<span className='flex items-baseline'>
			{target}
			<Popover className='relative ml-2'>
				{({ open }) => (
					<>
						<PopoverButton
							className={
								'focus-visible:ring-interactive mb-1 rounded-full align-middle focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none'
							}>
							<Icon
								IconName='InfoCircleIcon'
								className='size-4'
							/>
						</PopoverButton>
						<AnimatePresence>
							{open && (
								<PopoverPanel
									transition
									as={motion.div}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									anchor={{
										to: 'right',
										gap: 10,
									}}>
									<div
										className={cn(
											'border-v2-grey-50/15 rounded-md border',
											'bg-v2-slate-700',
											'relative ml-2 flex w-2xs max-w-3xs flex-col px-3 py-2 pb-2',
											'text-v2-grey-50 shadow-v2-slate-700/20 text-xs italic shadow-2xs'
										)}>
										{children}
										<span className='absolute top-1/2 -left-1 flex -translate-y-1/2 items-center justify-center text-center'>
											<span
												className='border-v2-grey-50/15 bg-v2-slate-700 z-10 block h-2 w-2 border'
												style={{
													rotate: '45deg',
													clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 0% 0%)',
												}}
											/>
										</span>
									</div>
								</PopoverPanel>
							)}
						</AnimatePresence>
					</>
				)}
			</Popover>
		</span>
	)
}
