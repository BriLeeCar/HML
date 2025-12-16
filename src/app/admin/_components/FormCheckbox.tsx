'use client'

import { useState, type ReactNode } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import { Checkbox, CheckboxField, Description, Label } from './catalyst/'

export const CheckBox = ({
	label,
	description,
	...props
}: Props<typeof Checkbox> & {
	label: ReactNode
	description?: ReactNode
}) => {
	return (
		<CheckboxField>
			<Checkbox
				{...props}
				aria-label={props.name}
				id={props.name}
				color='brand'
			/>
			<Label htmlFor={props.name}>{label}</Label>
			{description && <Description>{description}</Description>}
		</CheckboxField>
	)
}

type CBProps = Props<'button'> & {
	checked?: boolean
	onCheck?: (checked: boolean) => void
	onUncheck?: (checked: boolean) => void
	onToggle?: (checked: boolean) => void
}

export const CB = ({ ...props }: CBProps) => {
	const [checked, setChecked] = useState(props.defaultChecked || false)
	return (
		<span
			onClickCapture={() => setChecked(!checked)}
			data-el='checkbox'
			data-slot='control'
			className='border-input/15 has-data-checked:bg-v2-red-500/90 hover:click hover:border-input/30 relative block h-4.5 w-4.5 cursor-pointer overflow-hidden rounded-[5px] border bg-white text-white *:cursor-pointer dark:text-black'>
			<button
				{...props}
				type='button'
				role='checkbox'
				aria-checked={checked}
				data-checked={checked ? '' : undefined}
				className={cn(
					'block h-4 w-4 rounded-[4px] shadow-xs',

					// ! CHECKED
					'data-checked:bg-v2-mulberry-500/70 border-v2-mulberry-500/50 data-checked:border',
					// ! FOCUS
					'ring-interactive ring-offset-2 focus-visible:ring-2 focus-visible:outline-0',
					'shadow-inner shadow-amber-200',
					// ! AFTER
					''
				)}
			/>
			{checked && (
				<Icon
					IconName='CheckIcon'
					className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 stroke-current stroke-2'
				/>
			)}
			<input
				tabIndex={-1}
				type='checkbox'
				data-checked={checked ? '' : undefined}
				className='sr-only'
				onClick={() => setChecked(!checked)}
			/>
		</span>
	)
}
