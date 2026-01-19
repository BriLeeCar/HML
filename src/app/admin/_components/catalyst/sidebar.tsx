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
	const iconClasses = cn(
		// ! Base
		'not-in-data-open:*:not-data-[slot=icon]:hidden not-in-data-open:*:data-[slot=icon]:mx-auto',

		// ! Focused
		'data-focus:*:data-[slot=icon]:text-hml-slate-800',

		// ! Hovered
		'data-hover:not-data-current:*:data-[slot=icon]:text-hml-yellow-100',

		// ! Current
		'data-current:*:data-[slot=icon]:text-hml-slate-800',

		// ! Leading icon/icon-only
		'*:data-[slot=icon]:text-hml-yellow-500 *:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:size-5',

		// ! Trailing icon (down chevron or similar)
		'*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4',

		// ! Closed Sidebar
		'not-in-data-open:*:data-[slot=icon]:size-7',
		'not-in-data-open:*:last:data-[slot=icon]:size-7',
		'sm:not-in-data-open:*:data-[slot=icon]:size-6',
		'sm:not-in-data-open:*:last:data-[slot=icon]:size-6'
	)

	let classes = cn(
		// Base
		'text-hml-grey-50 flex w-full items-center gap-6 px-2.5 py-4 text-left text-sm leading-6 font-semibold uppercase in-data-open:px-4 in-data-open:py-2.5',
		// Hover
		'click data-hover:not-data-current:bg-hml-yellow-300/25',

		// Current
		'data-current:bg-hml-yellow-300 data-current:text-hml-slate-800',
		// Focus
		'data-focus:not-data-current:bg-hml-yellow-300/80 data-focus:text-hml-slate-800 focus-visible:outline-0 data-focus:outline-none',
		iconClasses
	)

	return (
		<span className={cn(className, 'relative focus-visible:outline-0')}>
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
