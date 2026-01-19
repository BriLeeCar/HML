'use client'

import { SidebarItem } from '@/admin/_components/catalyst'
import { navList, navListSections } from '@/admin/_lib/navLinks'
import Link from 'next/link'
import { useContext, type ReactNode } from 'react'
import { Icon } from '~/components'
import { cn } from '~/lib'
import { FullLogo } from './Logo'
import { CurrentPathContext } from './SidebarContext'
import { SidebarFooter } from './SidebarFooter'
import { SidebarLabel } from './SidebarLabel'
import { SideBarProvider } from './SideBarProvider'
import { SidebarSection } from './SidebarSection'
import type { tSidebarReceiverItem } from './types'

export const Sidebar = ({ userRoles }: { userRoles: string[] }) => {
	const sections = [
		{
			key: 'general',
			name: undefined,
		},
		...navListSections,
	].map(section => ({
		...section,
		items:
			section.key != 'general' ?
				navList.filter(item => item.section === section.key)
			:	navList.filter(item => !item.section),
	}))

	return (
		<SideBarProvider>
			<Body>
				<Header />
				<Main>
					{sections.map(s => (
						<SidebarSection
							key={s.key}
							heading={s.name}>
							{s.items.map(item => (
								<SidebarReceiverItem
									userRoles={userRoles}
									roles={item.roles || []}
									key={item.href}
									href={item.href}
									name={item.name}
									icon={(item.icon + (item.solid ? '-s' : '')) as IconKey}
								/>
							))}
						</SidebarSection>
					))}
				</Main>
				<SidebarFooter />
			</Body>
		</SideBarProvider>
	)
}

const Header = ({ children }: Props) => {
	const { open } = useContext(CurrentPathContext)!
	return (
		<div
			className={
				'border-hml-slate-100/5 text-hml-grey flex flex-col border-b py-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5'
			}>
			<Link
				href='/admin'
				className='pr-4 pl-2'>
				<FullLogo
					className='in-[a:hover]:*:[#Icon]:fill-hml-yellow mx-auto h-auto in-data-open:max-w-full not-in-data-open:*:[#Text]:hidden'
					viewBox={!open ? '0 0 260.38 260.38' : '0 0 642.77 260.38'}
				/>
			</Link>
			{children}
		</div>
	)
}

const Main = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className={
				'flex flex-1 flex-col overflow-y-auto py-4 [&>[data-slot=section]+[data-slot=section]]:mt-8'
			}>
			{children}
		</div>
	)
}

const Body = ({ children }: { children: ReactNode }) => {
	const { open, pin, set } = useContext(CurrentPathContext)!

	const handleHover = (target: HTMLDivElement, type: 'enter' | 'exit') => {
		if (pin) return
		if (type == 'exit') {
			set({
				type: 'SET',
				key: 'open',
				payload: false,
			})
		} else {
			const hovered = setTimeout(() => {
				if (target.matches(':hover') || target.querySelector(':hover')) {
					set({
						type: 'SET',
						key: 'open',
						payload: true,
					})
				}
			}, 200)

			target.addEventListener('mouseleave', () => clearTimeout(hovered))
		}
	}

	const handleEnter = (e: EMouse<HTMLDivElement>) => {
		handleHover(e.currentTarget, 'enter')
	}
	const handleLeave = (e: EMouse<HTMLDivElement>) => {
		handleHover(e.currentTarget, 'exit')
	}

	return (
		<div
			className={cn(
				'transition-all duration-200',
				'data-pinned:animate-nav-pin',
				'not-data-pinned:animate-nav-unpin',
				'data-open:animate-nav-open not-data-open:animate-nav-close relative p-0 data-open:not-data-pinned:p-2'
			)}
			{...(open || pin ? { 'data-open': true } : {})}
			{...(open || pin ? { 'data-open': true } : {})}
			{...(pin ? { 'data-pinned': true } : {})}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}>
			<nav
				className={cn(
					'transition-all duration-500',
					'bg-hml-slate-900 relative z-900 hidden h-full min-h-0 w-full flex-col in-data-open:translate-x-0 md:flex dark:bg-[#1C1E21]',
					open && !pin ?
						'[--tw-shadow-color:color-mix(in oklab, var(--color-hml-slate-900) 30%, transparent)] rounded-xl shadow-[0_1px_3px_0_var(--tw-shadow-color,rgba(0,0,0,0.1)),0_1px_2px_-1px_var(--tw-shadow-color,rgba(0,0,0,0.1))]'
					:	'[--tw-shadow-color:rgb(0 0 0 / 0)] rounded-none'
				)}>
				{children}
			</nav>
		</div>
	)
}

export const SidebarReceiverItem = ({ icon, userRoles, roles, ...props }: tSidebarReceiverItem) => {
	const { currentPath } = useContext(CurrentPathContext)!

	const isSolid = icon?.endsWith('-s')
	const iconName = icon?.split('-s')[0] as IconKey

	if (roles && roles.length > 0) {
		const hasRole = userRoles?.some(role => roles.includes(role))
		if (!hasRole) return <></>
	}

	return (
		<SidebarItem
			href={props.href}
			current={props.href === currentPath}>
			{icon && (
				<Icon
					IconName={iconName}
					data-slot='icon'
					solid={isSolid}
				/>
			)}
			<SidebarLabel>{props.name}</SidebarLabel>
		</SidebarItem>
	)
}
