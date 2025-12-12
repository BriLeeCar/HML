import { Fieldset, Legend, Text } from '@/admin/_components/catalyst'
import type { ReactNode } from 'react'

export const FormSubSection = ({
	description,
	legend,
	'aria-label': ariaLabel,
	asDiv = false,
	...props
}: Props<'fieldset'> & {
	legend: ReactNode
	description?: ReactNode
	asDiv?: boolean
}) => {
	return (
		<Fieldset
			{...props}
			aria-label={ariaLabel}>
			<Legend className='max-sm:text-base'>{legend}</Legend>
			{description && (
				<Text
					asDiv={asDiv}
					className='text-balance'
					data-slot='description'>
					{description}
				</Text>
			)}
			{props.children}
		</Fieldset>
	)
}
