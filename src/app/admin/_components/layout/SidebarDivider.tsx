'use client'
import { cn } from '~/lib/cn'

export function SidebarDivider({ className, ...props }: Props<'hr'>) {
	return (
		<hr
			{...props}
			className={cn(className, 'my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5')}
		/>
	)
}
