'use client'
import { cn } from '~/lib'

export function SidebarSpacer({ className, ...props }: Props<'div'>) {
	return (
		<div
			aria-hidden='true'
			{...props}
			className={cn(className, 'mt-8 flex-1')}
		/>
	)
}
