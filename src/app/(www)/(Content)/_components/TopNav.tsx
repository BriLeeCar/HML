'use client'

import { FullLogo } from '@/admin/_components/layout/Logo'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { links } from 'www/_lib/navLinks'
import { Button } from '~/components/Button'
import { cn } from '~/lib/cn'
import { MenuIcon } from './MenuIcon'

export const NavMenu = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	const cleanup = () => {
		document.body.style.overflow = 'auto'
		setMenuOpen(false)
	}

	const handleClick = () => {
		if (!menuOpen) {
			setMenuOpen(true)
			document.body.style.overflow = 'hidden'
		} else {
			cleanup()
		}
	}

	return (
		<>
			<div
				className={cn(
					menuOpen && 'text-hml-red dark:text-hml-grey',
					!menuOpen && 'text-hml-red dark:text-hml-grey',
					'bg-background/20 flex h-full w-full justify-between p-2 text-sm'
				)}>
				<Link
					prefetch={false}
					href='/'
					className='relative z-99 h-full w-47.5 *:h-full *:w-auto'>
					<FullLogo
						className={cn(
							'*:drop-shadow-foreground/10 *:drop-shadow-[2px_2px_0px] dark:*:drop-shadow-none'
						)}
					/>
				</Link>
				<Button
					data-toggles='menu'
					aria-expanded={menuOpen}
					aria-label='Open Menu'
					onClick={handleClick}
					variant='ghost'
					className='z-99'>
					<MenuIcon open={menuOpen} />
				</Button>
			</div>

			<div
				id='navOverlay'
				className='absolute top-0 right-0 left-0 hidden h-screen w-screen bg-black/40 transition-all'
				onClick={cleanup}
				style={{
					opacity: menuOpen ? 1 : 0,
					display: menuOpen ? 'block' : 'none',
				}}
			/>
			<motion.nav
				initial={{ height: '0rem' }}
				animate={{ height: menuOpen ? 'auto' : '0rem' }}
				className={cn('absolute top-0 flex w-full flex-col overflow-clip')}>
				<div className='bg-hml-slate dark:bg-hml-slate-900 flex h-screen w-full flex-col md:h-auto'>
					<span className='h-20' />

					<span className='overflow-hidden bg-white/15'>
						<menu className='grid grid-cols-1 gap-x-px gap-y-px pt-px sm:grid-cols-2 sm:*:last:odd:col-span-2'>
							{links.map((link, index) => (
								<li
									key={index}
									className='bg-hml-slate dark:bg-hml-slate-800 click block brightness-90 hover:brightness-120'>
									<DesktopLink
										href={link.href}
										children={link.text}
										onNavigate={() => cleanup()}
									/>
								</li>
							))}
						</menu>
					</span>
				</div>
			</motion.nav>
		</>
	)
}

const DesktopLink = ({ ...props }: Props<typeof Link>) => {
	return (
		<Link
			{...props}
			scroll={true}
			prefetch={false}
			className={cn('text-hml-grey block p-8 text-2xl font-bold')}
		/>
	)
}
