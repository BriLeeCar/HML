import * as Headless from '@headlessui/react'
import { cn } from '~/lib/cn'

export function Fieldset({
	className,
	...props
}: { className?: string } & Omit<Headless.FieldsetProps, 'as' | 'className'>) {
	return (
		<Headless.Fieldset
			{...props}
			className={cn(className, '*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6')}
		/>
	)
}

export function Legend({
	className,
	...props
}: { className?: string } & Omit<Headless.LegendProps, 'className'>) {
	return (
		<Headless.Legend
			as='legend'
			data-slot='legend'
			{...props}
			className={cn(
				'text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white',
				className
			)}
		/>
	)
}

export function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			data-slot='control'
			{...props}
			className={cn('space-y-8', className)}
		/>
	)
}

export function Field({
	className,
	...props
}: { className?: string } & Omit<Headless.FieldProps, 'as' | 'className'>) {
	return (
		<Headless.Field
			{...props}
			className={cn(
				'[&>[data-slot=label]+[data-slot=control]]:mt-3',
				'[&>[data-slot=label]+[data-slot=description]]:mt-1',
				'[&>[data-slot=description]+[data-slot=control]]:mt-3',
				'[&>[data-slot=control]+[data-slot=description]]:mt-3',
				'[&>[data-slot=control]+[data-slot=error]]:mt-3',
				'*:data-[slot=label]:font-medium',
				'relative',
				className
			)}
		/>
	)
}

export function Label({
	required,
	className,
	...props
}: { className?: string; required?: boolean } & Omit<Headless.LabelProps, 'as' | 'className'>) {
	return (
		<Headless.Label
			data-slot='label'
			aria-required={required ? 'true' : undefined}
			{...props}
			className={cn(
				'text-base/6 text-zinc-950 select-none data-disabled:opacity-50 sm:text-sm/6 dark:text-white',
				[
					'aria-required:after:ml-0.5',
					'aria-required:after:font-normal',
					'aria-required:after:text-red-500',
					'aria-required:after:content-["*"]',
				],
				className
			)}
		/>
	)
}

export function Description({
	className,
	...props
}: { className?: string } & Omit<Headless.DescriptionProps, 'as' | 'className'>) {
	return (
		<Headless.Description
			data-slot='description'
			{...props}
			className={cn(
				className,
				'text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400'
			)}
		/>
	)
}

export function ErrorMessage({
	className,
	...props
}: { className?: string } & Omit<Headless.DescriptionProps, 'as' | 'className'>) {
	return (
		<Headless.Description
			data-slot='error'
			{...props}
			className={cn(
				className,
				'text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500'
			)}
		/>
	)
}
