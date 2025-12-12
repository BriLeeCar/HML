import { useState } from 'react'
import { cn } from '~/lib/cn'

export const Form = ({ ...props }: Props<'form'>) => {
	return (
		<form
			{...props}
			className={cn('text-foreground flex w-full flex-col', props.className)}>
			{props.children}
		</form>
	)
}

const Fieldset = ({ className, ...props }: Props<'section'>) => {
	return (
		<fieldset
			data-layout='group'
			{...props}
			className={cn(className)}
		/>
	)
}

const Legend = ({
	toggle = false,
	defaultOpen = true,
	...props
}: Props<'legend'> & { toggle?: boolean; defaultOpen?: boolean }) => {
	const [open, setOpen] = useState(defaultOpen)
	const handleToggle = () => {
		toggle && setOpen(prev => !prev)
	}

	return (
		<legend
			{...props}
			data-layout='legend'
			data-state={
				toggle ?
					open ?
						'open'
					:	'closed'
				:	undefined
			}
			onClick={handleToggle}
			className={cn(toggle && 'click', props.className)}
		/>
	)
}

Fieldset.Legend = Legend

export { Fieldset }
