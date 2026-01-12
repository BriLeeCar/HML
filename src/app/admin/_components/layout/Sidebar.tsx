'use client'

import { SidebarItem } from '@/admin/_components/catalyst'
import { navList } from '@/admin/_lib/navLinks'
import { useContext, type ReactNode } from 'react'
import { Icon } from '~/components'
import { cn } from '~/lib'
import { SidebarBody } from './SidebarBody'
import { CurrentPathContext } from './SidebarContext'
import { SidebarFooter } from './SidebarFooter'
import { SidebarHeader } from './SidebarHeader'
import { SidebarLabel } from './SidebarLabel'
import { SideBarProvider } from './SideBarProvider'
import { SidebarSection } from './SidebarSection'

const SidebarReceiver = ({ children }: { children: ReactNode }) => {
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

export const SidebarReceiverItem = ({ icon, ...props }: Props<'a'> & { icon?: SolidIcon }) => {
	const { currentPath } = useContext(CurrentPathContext)!

	const isSolid = icon?.endsWith('-s')
	const iconName = icon?.split('-s')[0] as IconKey

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
			<SidebarLabel>{props.children}</SidebarLabel>
		</SidebarItem>
	)
}

type SolidIcon = IconKey | `${IconKey}-s`

export const Sidebar = () => {
	return (
		<SideBarProvider>
			<SidebarReceiver>
				<SidebarHeader />
				<SidebarBody>
					<SidebarSection>
						{navList.map(item => (
							<SidebarReceiverItem
								key={item.href}
								href={item.href}
								icon={(item.icon + (item.solid ? '-s' : '')) as SolidIcon}>
								{item.name}
							</SidebarReceiverItem>
						))}
					</SidebarSection>
				</SidebarBody>
				<SidebarFooter />
			</SidebarReceiver>
		</SideBarProvider>
	)
}
