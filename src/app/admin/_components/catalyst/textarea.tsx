import * as Headless from '@headlessui/react'
import { forwardRef, type ForwardedRef } from 'react'
import { cn } from '~/lib/cn'

export const Textarea = forwardRef(function Textarea(
	{
		className,
		resizable = true,
		...props
	}: { className?: string; resizable?: boolean } & Omit<Headless.TextareaProps, 'as' | 'className'>,
	ref: ForwardedRef<HTMLTextAreaElement>
) {
	return (
		<span
			data-slot='control'
			className={cn([
				className,
				// Basic layout
				'form-base form-base-shadow form-base-focus relative block w-full',
			])}>
			<Headless.Textarea
				rows={4}
				ref={ref}
				{...props}
				className={cn([
					// Basic layout
					'relative block h-full w-full appearance-none px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
					'form-border form-bg form-text',
					// Resizable
					resizable ? 'resize-y' : 'resize-none',
				])}
			/>
		</span>
	)
})
