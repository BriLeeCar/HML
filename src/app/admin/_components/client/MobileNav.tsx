'use client'

import { navList } from '@/admin/_lib/navLinks'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icon } from '~/components/Icon'

export const MobileNav = ({ ...props }) => {
	const [isOpen, setIsOpen] = useState(false)
	const path = usePathname()
	useEffect(() => {
		setIsOpen(false)
	}, [path])

	return (
		<span
			{...props}
			className='grid items-center justify-center md:hidden'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='click'>
				<Icon
					IconName='MenuIcon'
					className='h-full min-h-12 w-auto'
				/>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.nav
						initial={{ height: '0' }}
						animate={{ height: '100vh' }}
						exit={{ height: '0' }}
						data-el='mobile-nav'
						className='dark:bg-v2-slate-900 bg-v2-slate-800 fixed top-0 left-0 z-999 flex h-screen w-full flex-col justify-between overflow-hidden pb-0'>
						<ul className='bg-foreground/10 relative z-10 flex h-full flex-col justify-center gap-y-px overflow-hidden py-8 text-3xl'>
							{navList.map(item => (
								<li
									key={item.href}
									className='border-v2-slate-600 not-last:border-b'>
									<Link
										style={{
											minHeight: `calc(50vh/${navList.length + 1})`,
										}}
										href={item.href}
										className='bg-v2-slate-900 dark:border-v2-slate-700 focus-visible:bg-v2-yellow-300/85 hover:bg-v2-yellow-300/85 text-v2-yellow-300 focus:*:text-v2-slate-900 hover:*:text-v2-slate-900 relative z-10 flex h-max items-center justify-start px-8 py-8 uppercase transition-colors focus-visible:ring-0 focus-visible:outline-0'>
										<Icon
											IconName={item.icon}
											className='mr-4 inline-block size-6 text-current'
											solid={item.solid}
										/>
										<span className='text-v2-yellow-50 dark:text-v2-grey-50 font-light tracking-widest'>
											{item.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
						<span className='bg-foreground/10 before:bg-v2-slate-900 relative mx-auto flex h-1/4 w-full items-end justify-center gap-4 overflow-hidden p-4 before:absolute before:bottom-0 before:block before:h-1/3 before:w-full before:content-[""]'>
							<button
								autoFocus={true}
								className='bg-v2-yellow-300 text-v2-slate-700 click hover:bg-v2-slate-900 hover:text-v2-yellow-300 hover:border-v2-yellow-300 z-20 flex items-center gap-4 rounded-full p-4 text-3xl uppercase transition-colors hover:border focus-visible:ring-0 focus-visible:outline-0'
								onClick={() => setIsOpen(false)}>
								<Icon
									IconName='XIcon'
									className='h-10 w-auto'
								/>
							</button>
						</span>
					</motion.nav>
				)}
			</AnimatePresence>
		</span>
	)
}
