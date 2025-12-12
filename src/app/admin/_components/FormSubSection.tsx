import { Fieldset, Legend, Text } from '@/admin/_components/catalyst'
import type { ReactNode } from 'react'
import { Tooltip } from './Tooltip'

export const FormSubSection = ({
	description,
	legend,
	'aria-label': ariaLabel,
	asDiv = false,
	tooltip,
	...props
}: Props<'fieldset'> & {
	legend: ReactNode
	description?: ReactNode
	asDiv?: boolean
	tooltip?: string
}) => {
	return (
		<Fieldset
			{...props}
			aria-label={ariaLabel}>
			<Legend className='flex items-baseline max-sm:text-base'>
				{tooltip ?
					<Tooltip target={legend}>{tooltip}</Tooltip>
				:	legend}
			</Legend>
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
