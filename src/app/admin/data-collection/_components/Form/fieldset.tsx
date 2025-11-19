import * as Headless from '@headlessui/react'
import type React from 'react'
import { cn } from '~/lib/cn'
export function Fieldset({
	className,
	...props
}: { className?: string } & Omit<
	Headless.FieldsetProps,
	'as' | 'className'
>) {
	return (
		<Headless.Fieldset
			{...props}
			className={cn(
				className,
				'*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6 [&>*+[data-slot=label]+[data-slot=control]]:mt-3'
			)}
		/>
	)
}

export function Legend({
	className,
	...props
}: { className?: string } & Omit<
	Headless.LegendProps,
	'as' | 'className'
>) {
	return (
		<Headless.Legend
			data-slot='legend'
			data-type='label'
			data-level='fieldset'
			{...props}
			className={cn(
				'max-md:w-full',
				'text-lg/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white',
				className
			)}
		/>
	)
}

export function FieldGroup({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			data-slot='control'
			data-type='layout'
			data-level='fieldset'
			{...props}
			className={cn('space-y-8', className)}
		/>
	)
}

export function Field({
	className,
	...props
}: { className?: string } & Omit<
	Headless.FieldProps,
	'as' | 'className'
>) {
	return (
		<Headless.Field
			data-slot='field'
			data-type='wrapper'
			data-level='field'
			{...props}
			className={cn(
				className,
				'[&>[data-slot=label]+[data-slot=control]]:mt-1',
				'[&>[data-slot=label]+[data-slot=description]]:mt-1',
				'[&>[data-slot=description]+[data-slot=control]]:mt-3',
				'[&>[data-slot=control]+[data-slot=description]]:mt-3',
				'[&>[data-slot=control]+[data-slot=error]]:mt-1',
				'*:data-[slot=label]:font-medium'
			)}
		/>
	)
}

export function Label({
	className,
	...props
}: { className?: string } & Omit<
	Headless.LabelProps,
	'as' | 'className'
>) {
	return (
		<Headless.Label
			data-slot='label'
			data-type='label'
			data-level='field'
			{...props}
			className={cn(
				'text-base/6 text-zinc-600 select-none data-disabled:opacity-75 sm:text-sm/6 dark:text-white',
				className
			)}
		/>
	)
}

export function Description({
	className,
	...props
}: { className?: string } & Omit<
	Headless.DescriptionProps,
	'as' | 'className'
>) {
	return (
		<Headless.Description
			data-slot='description'
			data-type='text'
			data-level='field'
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
}: { className?: string } & Omit<
	Headless.DescriptionProps,
	'as' | 'className'
>) {
	return (
		<Headless.Description
			data-type='text'
			data-level='field'
			data-slot='error'
			{...props}
			className={cn(
				className,
				'text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500'
			)}
		/>
	)
}
