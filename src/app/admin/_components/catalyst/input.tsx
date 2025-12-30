import * as Headless from '@headlessui/react'
import { forwardRef, type ForwardedRef } from 'react'
import { cn } from '~/lib/cn'

export function InputGroup({ children, className }: Props<'span'>) {
	return (
		<span
			data-slot='control'
			className={cn(
				'relative isolate block',
				// ! icon positioning
				'has-[[data-slot=icon]:first-child]:[&_input]:pl-10 has-[[data-slot=icon]:last-child]:[&_input]:pr-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-8',
				'*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4',
				'[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5',
				// ! Icon colors
				'*:data-[slot=icon]:text-zinc-500 dark:*:data-[slot=icon]:text-zinc-400',
				'focus-within:*:data-[slot=icon]:text-interactive',
				// ! Icon invalid state
				'in-aria-invalid:*:data-[slot=icon]:text-red-500',
				'has-aria-invalid:*:data-[slot=icon]:text-red-500 has-data-invalid:*:data-[slot=icon]:text-red-500',
				className
			)}>
			{children}
		</span>
	)
}

const dateTypes = ['date', 'datetime-local', 'month', 'time', 'week']
type DateType = (typeof dateTypes)[number]

export const Input = forwardRef(function Input(
	{
		className,
		...props
	}: {
		className?: string
		type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | DateType
	} & Omit<Headless.InputProps, 'as' | 'className'>,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<span
			data-slot='control'
			className={cn([
				// Basic layout
				'relative block w-full',
				'form-base-shadow form-base-focus form-base in-data-invalid:before:shadow-red-900/15',
				className,
			])}>
			<Headless.Input
				ref={ref}
				{...props}
				className={cn([
					// Date classes
					props.type
						&& dateTypes.includes(props.type) && [
							'[&::-webkit-datetime-edit-fields-wrapper]:p-0',
							'[&::-webkit-date-and-time-value]:min-h-[1.5em]',
							'[&::-webkit-datetime-edit]:inline-flex',
							'[&::-webkit-datetime-edit]:p-0',
							'[&::-webkit-datetime-edit-year-field]:p-0',
							'[&::-webkit-datetime-edit-month-field]:p-0',
							'[&::-webkit-datetime-edit-day-field]:p-0',
							'[&::-webkit-datetime-edit-hour-field]:p-0',
							'[&::-webkit-datetime-edit-minute-field]:p-0',
							'[&::-webkit-datetime-edit-second-field]:p-0',
							'[&::-webkit-datetime-edit-millisecond-field]:p-0',
							'[&::-webkit-datetime-edit-meridiem-field]:p-0',
						],
					// Basic layout
					'relative block w-full appearance-none px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
					// Typography
					'form-text form-bg form-border',

					// Background color
					// Hide default focus styles
					'focus:outline-hidden',
					// System icons
					'dark:scheme-dark',
				])}
			/>
		</span>
	)
})
