'use client'

import { useState, type ReactNode } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'

const SectionFieldset = ({ 'aria-label': ariaLabel, ...props }: Props<'fieldset'>) => {
	return (
		<fieldset
			{...props}
			aria-label={ariaLabel}
			className={cn(
				'grid w-full gap-y-8 has-data-open:mb-0 md:-mb-8 lg:max-w-3xl',
				props.className
			)}>
			{props.children}
		</fieldset>
	)
}

export const FormSectionLegend = ({
	description,
	defaultOpen = true,
	...props
}: Props<'legend'> & {
	description?: ReactNode
	defaultOpen?: boolean
}) => {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<legend
			data-slot='legend'
			{...(open ? { 'data-open': '' } : {})}
			{...props}
			className={cn('relative mb-8 grid gap-y-4', props.className)}>
			<button
				type='button'
				className={cn(
					'title-subsection hidden',
					'click',
					'w-full flex-row items-center gap-4 sm:flex'
				)}
				onClick={() => setOpen(!open)}>
				<Icon
					IconName='ChevronRightIcon'
					className={cn(open && 'rotate-90')}
				/>
				{props.children}
			</button>
			<h3 className='title-subsection hidden w-full flex-row items-center gap-4 max-sm:flex'>
				{props.children}
			</h3>
			{description && <p className='subtitle'>{description}</p>}
		</legend>
	)
}

export const FormSectionDetails = ({ ...props }: Props) => {
	return (
		<div
			{...props}
			className={cn(
				'mx-auto grid w-full gap-y-6 px-3 md:hidden md:in-[fieldset:has(>[data-open])]:grid',
				props.className
			)}
		/>
	)
}

SectionFieldset.Legend = FormSectionLegend
SectionFieldset.Details = FormSectionDetails

export { SectionFieldset as FormSection }
