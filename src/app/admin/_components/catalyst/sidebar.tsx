'use client'

import * as Headless from '@headlessui/react'
import { forwardRef, type ForwardedRef } from 'react'
import { cn } from '~/lib/cn'
import { TouchTarget } from './button'
import { Link } from './link'

export const SidebarItem = forwardRef(function SidebarItem(
	{
		current,
		className,
		children,
		...props
	}: {
		current?: boolean
		className?: string
		children: ReactNode
	} & (
		| ({ href?: never } & Omit<Headless.ButtonProps, 'as' | 'className'>)
		| ({ href: string } & Omit<Headless.ButtonProps<typeof Link>, 'as' | 'className'>)
	),
	ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
	let classes = cn(
		// Base
		'text-hml-grey-50 flex w-full items-center gap-6 px-4 py-2.5 text-left text-sm leading-6 font-semibold uppercase not-in-data-open:p-4',
		// Icon Base
		'not-in-data-open:*:not-data-[slot=icon]:hidden not-in-data-open:*:data-[slot=icon]:mx-auto',

		// Leading icon/icon-only
		'*:data-[slot=icon]:fill-hml-yellow-500 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:size-5',
		// Trailing icon (down chevron or similar)
		'*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4',
		// Hover
		'click data-hover:bg-hml-slate-100/15 data-hover:*:data-[slot=icon]:fill-hml-yellow-100',
		// Active
		'data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950',
		// Current
		'data-current:*:data-[slot=icon]:fill-hml-yellow-300 data-current:bg-hml-slate-100/15',
		// Dark mode
		'dark:text-white dark:*:data-[slot=icon]:fill-zinc-400',
		'dark:data-hover:bg-white/5 dark:data-hover:*:data-[slot=icon]:fill-white',
		'dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white',
		'dark:data-current:*:data-[slot=icon]:fill-white'
	)

	return (
		<span className={cn(className, 'relative')}>
			{typeof props.href === 'string' ?
				<Headless.CloseButton
					as={Link}
					{...props}
					className={classes}
					data-current={current ? 'true' : undefined}
					ref={ref}>
					<TouchTarget>{children}</TouchTarget>
				</Headless.CloseButton>
			:	<Headless.Button
					{...props}
					className={cn(classes)}
					data-current={current ? 'true' : undefined}
					ref={ref}>
					<TouchTarget>{children}</TouchTarget>
				</Headless.Button>
			}
		</span>
	)
})
