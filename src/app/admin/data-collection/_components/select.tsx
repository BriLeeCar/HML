import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { cn } from '~/lib/cn'

export const Select = forwardRef(function Select(
	{
		className,
		multiple,
		placeholder,
		...props
	}: {
		className?: string
		placeholder?: {
			value: string | number
			label: string
			selected: boolean
		}
	} & Omit<Headless.SelectProps, 'as' | 'className'>,
	ref: React.ForwardedRef<HTMLSelectElement>
) {
	return (
		<span
			data-slot='control'
			className={cn([
				// Basic layout
				'group relative block w-full',
				// Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
				'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm in-data-invalid:before:shadow-red-900/15',
				// Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
				'dark:before:hidden',
				// Focus ring
				'has-data-focus:after:ring-interactive after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset has-data-focus:after:ring-2',
				// Disabled state
				'has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none',
				className,
			])}>
			<Headless.Select
				ref={ref}
				multiple={multiple}
				{...props}
				{...(placeholder && placeholder.selected ? { 'data-placeholder': true } : {})}
				className={cn([
					// Basic layout
					'relative block w-full appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
					// Horizontal padding
					multiple ?
						'px-[calc(--spacing(3.5)-1px)] sm:px-[calc(--spacing(3)-1px)]'
					:	'pr-[calc(--spacing(10)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pr-[calc(--spacing(9)-1px)] sm:pl-[calc(--spacing(3)-1px)]',
					// Options (multi-select)
					'[&_optgroup]:font-semibold',
					// Typography
					'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white dark:*:text-white',
					// Border
					'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
					// Background color
					'bg-transparent dark:bg-white/5 dark:*:bg-zinc-800',
					// Hide default focus styles
					'focus:outline-hidden',
					// Invalid state
					'data-invalid:border-red-500/40 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600/40 dark:data-invalid:data-hover:border-red-600',
					'in-data-invalid:border-red-500/40 in-data-invalid:data-hover:border-red-500 dark:in-data-invalid:border-red-600/40 dark:in-data-invalid:data-hover:border-red-600',
					'click',
					// Disabled state
					'data-disabled:cursor-not-allowed data-disabled:border-zinc-950/20 data-disabled:opacity-100 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/2.5 dark:data-hover:data-disabled:border-white/15',
					'data-placeholder:text-center data-placeholder:text-xs/6 data-placeholder:tracking-wide data-placeholder:text-current/75 data-placeholder:italic',
				])}>
				<>
					{placeholder && <option value={placeholder.value}>{placeholder.label}</option>}
					{props.children}
				</>
			</Headless.Select>
			{!multiple && (
				<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
					<svg
						className='size-5 stroke-zinc-500 group-has-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]'
						viewBox='0 0 16 16'
						aria-hidden='true'
						fill='none'>
						<path
							d='M5.75 10.75L8 13L10.25 10.75'
							strokeWidth={1.5}
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M10.25 5.25L8 3L5.75 5.25'
							strokeWidth={1.5}
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</span>
			)}
		</span>
	)
})
