'use client'

import { SidebarItem } from '@/admin/_components/catalyst'
import { navList } from '@/admin/_lib/navLinks'
import { LayoutGroup, motion } from 'motion/react'
import { useContext, type ReactNode } from 'react'
import { Icon } from '~/components'
import { SidebarBody } from './SidebarBody'
import { CurrentPathContext } from './SidebarContext'
import { SidebarFooter } from './SidebarFooter'
import { SidebarHeader } from './SidebarHeader'
import { SidebarLabel } from './SidebarLabel'
import { SideBarProvider } from './SideBarProvider'
import { SidebarSection } from './SidebarSection'

const SidebarReceiver = ({ children }: { children: ReactNode }) => {
	const { open, pin, set } = useContext(CurrentPathContext)!

	return (
		<motion.div
			layout
			initial={false}
			animate={{
				width: open || pin ? '14rem' : '3.5rem',
				paddingLeft: open && !pin ? '0.5rem' : '0rem',
				paddingBlock: open && !pin ? '0.5rem' : '0rem',
			}}
			className='relative p-1'
			onMouseEnter={() => {
				if (!pin)
					set({
						type: 'SET',
						key: 'open',
						payload: true,
					})
			}}
			onMouseLeave={() => {
				if (!pin) {
					set({
						type: 'SET',
						key: 'open',
						payload: false,
					})
				}
			}}>
			<motion.nav
				animate={{
					borderRadius: open && !pin ? '0.5rem' : '0px',
					'--tw-shadow-color':
						open && !pin ?
							'color-mix(in oklab, var(--color-hml-slate-900) 30%, transparent)'
						:	'rgb(0 0 0 / 0)',
					'--tw-shadow':
						'0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1))',
					boxShadow: 'var(--tw-shadow)',
				}}
				className='bg-hml-slate-900 relative z-900 hidden h-full min-h-0 w-full flex-col md:flex dark:bg-[#1C1E21]'
				{...(open || pin ? { 'data-open': true } : {})}
				{...(pin ? { 'data-pinned': true } : {})}>
				<LayoutGroup>{children}</LayoutGroup>
			</motion.nav>
		</motion.div>
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
				<SidebarHeader></SidebarHeader>
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
