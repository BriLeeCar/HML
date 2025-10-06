'use client'
import { type ComponentPropsWithoutRef, useState } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import {
	FieldGroup,
	Fieldset,
	Legend,
} from '../../_components/fieldset'
import { Text } from '../../_components/text'

export const Section = ({
	sectionTitle,
	sectionDescription,
	...props
}: {
	sectionTitle: string
	sectionDescription: string
} & ComponentPropsWithoutRef<'fieldset'>) => {
	const [open, setOpen] = useState(true)

	const toggleOpen = () => {
		setOpen(!open)
	}

	return (
		<Fieldset {...props}>
			<Legend
				onClick={toggleOpen}
				className='cursor-pointer'>
				<Icon
					IconName='ChevronRightIcon'
					className={cn(
						open ? 'rotate-90' : '',
						'mr-2 inline-block h-4 w-4 transition-transform'
					)}
				/>
				{sectionTitle}
			</Legend>
			<Text>{sectionDescription}</Text>
			<FieldGroup className={open ? 'block' : 'hidden'}>
				{props.children}
			</FieldGroup>
		</Fieldset>
	)
}
