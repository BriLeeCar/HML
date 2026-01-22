'use client'
import { useContext, type ComponentPropsWithoutRef } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import { SidebarItem } from '../catalyst/sidebar'
import { CurrentPathContext } from './SidebarContext'
import { SidebarLabel } from './SidebarLabel'

export function SidebarFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
	const { set, open, pin } = useContext(CurrentPathContext)!
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col border-t border-zinc-950/5 py-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5',
				className
			)}>
			<SidebarItem href='/admin/auth/signout'>
				<SidebarLabel>Sign Out</SidebarLabel>
				<Icon
					IconName='LogoutIcon'
					data-slot='icon'
				/>
			</SidebarItem>
			{open ?
				<SidebarItem
					onClick={() =>
						set({
							type: 'TOGGLE',
							key: 'pin',
						})
					}>
					<SidebarLabel>Pin Open</SidebarLabel>
					<Icon
						IconName={pin ? 'PinIcon' : 'PinAltIcon'}
						data-slot='icon'
						solid
					/>
				</SidebarItem>
			:	<SidebarItem
					onClick={() =>
						set({
							type: 'SET',
							key: 'open',
							payload: true,
						})
					}>
					<SidebarLabel>Open</SidebarLabel>
					<Icon
						IconName={'ChevronDoubleRightIcon'}
						data-slot='icon'
						solid
					/>
				</SidebarItem>
			}
		</div>
	)
}
