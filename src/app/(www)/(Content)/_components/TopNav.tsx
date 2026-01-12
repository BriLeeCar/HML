'use client'

import { FullLogo } from '@/admin/_components/layout/Logo'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { links } from 'www/_lib/navLinks'
import { Button, Icon } from '~/components'
import { cn } from '~/lib/cn'

export const NavMenu = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	const cleanup = () => {
		document.body.style.overflow = 'auto'
		document.removeEventListener('click', handleOutsideClick)
		setMenuOpen(false)
	}
	const handleOutsideClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement
		const canClose = () => {
			if (
				(target.tagName == 'BUTTON' && target.closest('header'))
				|| (target.closest('button') && target.closest('button')?.ariaLabel == 'Close Menu')
				|| target.tagName == 'NAV'
			) {
				return true
			}
			return false
		}

		if (canClose()) {
			event.stopPropagation()
			cleanup()
		}
	}

	const handleClick = () => {
		if (!menuOpen) {
			setMenuOpen(true)
			document.body.style.overflow = 'hidden'
			document.addEventListener('click', handleOutsideClick)
		} else {
			cleanup()
		}
	}

	return (
		<>
			<div className={cn('z-99 w-full py-1', 'flex justify-between', 'text-sm')}>
				<Link
					prefetch={false}
					href='/'
					className='text-hml-mulberry relative min-h-10 w-47.5'>
					<FullLogo className='flex h-full min-h-16 w-auto items-center gap-0 px-4' />
				</Link>
				<Button
					data-toggles='menu'
					aria-expanded={menuOpen}
					aria-label='Open Menu'
					onClick={handleClick}
					variant='ghost'
					className='text-hml-mulberry'>
					{!menuOpen && (
						<Icon
							IconName='MenuIcon'
							className='size-10'
							strokeWidth={1}
						/>
					)}
					{menuOpen && (
						<Icon
							IconName='XIcon'
							className='size-10'
							strokeWidth={1}
						/>
					)}
				</Button>
			</div>

			<motion.nav
				initial={{ height: '0rem' }}
				animate={{ height: menuOpen ? '100vh' : '0rem' }}
				className={cn('absolute top-0 flex w-full flex-col overflow-clip md:rounded-b-4xl')}>
				<div className='bg-hml-slate flex h-screen w-full flex-col md:h-auto'>
					<span className={cn('z-99 w-full py-1 pb-4', 'flex justify-between', 'text-sm')}>
						<Link
							prefetch={false}
							href='/'
							className='text-hml-yellow relative min-h-10 w-47.5'>
							<FullLogo className='flex h-full min-h-16 w-auto items-center gap-0 px-4' />
						</Link>
						<Button
							data-toggles='menu'
							aria-expanded={menuOpen}
							aria-label='Close Menu'
							onClick={handleClick}
							variant='ghost'
							className='text-hml-yellow'>
							<Icon
								IconName='XIcon'
								className='size-10'
								strokeWidth={1}
							/>
						</Button>
					</span>
					<span className='overflow-hidden rounded-b-4xl bg-white/15'>
						<menu className='grid grid-cols-2 gap-x-px gap-y-px pt-px *:last:odd:col-span-2'>
							{links.map((link, index) => (
								<li
									key={index}
									className='bg-hml-slate click block brightness-100 hover:brightness-120'>
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
