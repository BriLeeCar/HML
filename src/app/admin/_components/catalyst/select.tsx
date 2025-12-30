import * as Headless from '@headlessui/react'
import { forwardRef, type ForwardedRef } from 'react'
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
	ref: ForwardedRef<HTMLSelectElement>
) {
	return (
		<span
			data-slot='control'
			className={cn([
				// Basic layout
				'group relative block w-full',
				// Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
				'form-base-shadow has-data-focus:after:ring-interactive form-base-focus form-base in-data-invalid:before:shadow-red-900/15',
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
					'form-border form-bg form-text click [&_optgroup]:font-semibold',
					// Disabled state
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
						className='stroke-muted group-has-data-disabled:stroke-muted/50 size-5 sm:size-4 forced-colors:stroke-[CanvasText]'
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
