'use client'
import { cn } from '~/lib'

export function SidebarSection({ className, ...props }: Props<'div'>) {
	return (
		<div
			{...props}
			data-slot='section'
			className={cn(className, 'flex flex-col gap-0.5')}
		/>
	)
}
