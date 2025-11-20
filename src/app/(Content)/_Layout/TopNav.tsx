'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { Button, Icon, TouchTarget } from '~/components'
import { cn } from '~/lib/cn'
import { Books, Certificate, HeartMap, HML, Mission, Support } from './SVG'

const links = [
	{
		text: 'Resource Map',
		Icon: HeartMap,
		href: '/map',
	},
	{
		text: 'Visa Explorer',
		Icon: Certificate,
		href: '/explorer',
	},
	{
		text: 'Guides & Resources',
		Icon: Books,
		href: '/guides-resources',
	},
	{
		text: 'Support Team',
		Icon: Support,
		href: '/support',
	},
	{
		text: 'Our Mission',
		Icon: Mission,
		href: '/our-mission',
	},
]

const NavMenuItem = ({
	Icon,
	active,
	...props
}: Props.Link & {
	Icon: (typeof links)[number]['Icon']
	active: boolean
}) => {
	return (
		<Link
			prefetch={false}
			{...props}
			className={cn(
				'hover:text-brand-bright-link relative flex h-full gap-3 rounded-lg px-3 transition-all',
				active && 'dark:md:text-foreground dark:md:bg-brand/20 md:text-brand',
				props.className
			)}
			{...(active && { 'data-active': '' })}
			title={props.children as string}>
			<Icon className={cn('text-muted-foreground size-6')} />
			<TouchTarget>
				<span>{props.children}</span>
			</TouchTarget>
		</Link>
	)
}

export const NavMenu = () => {
	const active = usePathname()
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
			<nav
				className={cn(
					'flex w-full overflow-hidden',
					'text-sidebar-foreground z-99 bg-zinc-200/70 py-2 text-xs font-semibold tracking-tight uppercase italic dark:bg-neutral-900'
				)}>
				<Link
					prefetch={false}
					href='/'
					className='relative'>
					<HML className='text-brand dark:text-brand-bright-link flex h-full w-auto items-center gap-0 px-4 py-1 text-3xl font-bold -tracking-widest' />
				</Link>
				<menu className='hidden w-full items-center justify-around md:flex'>
					{links.map((link, index) => (
						<NavMenuItem
							key={index}
							href={link.href}
							prefetch={false}
							active={active === link.href}
							className='flex items-center justify-between gap-2'
							Icon={link.Icon}
							title={link.text}>
							{link.text}
						</NavMenuItem>
					))}
				</menu>
				<menu className='flex w-full items-center justify-end gap-4 pr-4 md:hidden'>
					<Button
						variant='ghost'
						onClick={() => setMenuOpen(true)}
						title='Resource Map'>
						<Icon
							IconName='MenuIcon'
							className='size-10'
						/>
					</Button>
				</menu>
			</nav>
			<MobileNavMenu
				active={active}
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
			/>
		</>
	)
}

const MobileNavMenu = ({
	active,
	menuOpen,
	setMenuOpen,
}: {
	active: string
	menuOpen: boolean
	setMenuOpen: Dispatch<SetStateAction<boolean>>
}) => {
	return (
		<AnimatePresence>
			{menuOpen && (
				<>
					<motion.div
						initial={{ y: '-100vh' }}
						animate={{ y: 0 }}
						exit={{ y: '-100vh' }}
						transition={{
							type: 'spring',
							stiffness: 100,
							damping: 20,
						}}
						className={cn(
							'bg-background fixed inset-0 z-50 flex h-full min-h-screen w-full flex-col backdrop-blur-sm'
						)}>
						<header className='mb-4 flex w-full items-center justify-between p-4'>
							<Link
								prefetch={false}
								href='/'>
								<HML className='text-brand dark:text-brand-bright-link flex h-full w-auto items-center gap-0 px-4 py-1 text-3xl font-bold -tracking-widest' />
							</Link>
							<Button
								variant='ghost'
								onClick={() => setMenuOpen(false)}
								title='Close Menu'>
								<Icon
									IconName='XIcon'
									className='size-10'
								/>
							</Button>
						</header>
						<menu className='flex basis-full flex-col justify-around gap-0'>
							{links.map((link, index) => (
								<NavMenuItem
									prefetch={false}
									key={index}
									href={link.href}
									active={active === link.href}
									className='bg-background flex items-center gap-4 rounded-none px-4 py-3 text-xl font-semibold shadow-sm dark:border *:[svg]:size-6'
									Icon={link.Icon}
									title={link.text}
									onClick={() => setMenuOpen(false)}>
									{link.text}
								</NavMenuItem>
							))}
						</menu>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
