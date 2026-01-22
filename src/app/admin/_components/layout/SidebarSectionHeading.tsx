'use client'
import { cn } from '~/lib/cn'

export function SidebarSectionHeading({ className, ...props }: Props<'h3'>) {
	return (
		<h3
			{...props}
			className={cn(
				className,
				'mb-1 px-2 text-xs/6 font-medium text-zinc-500 not-in-data-[open=true]:hidden dark:text-zinc-400'
			)}
		/>
	)
}
