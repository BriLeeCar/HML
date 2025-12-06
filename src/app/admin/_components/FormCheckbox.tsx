import type { ReactNode } from 'react'
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
				color='brand'
			/>
			<Label>{label}</Label>
			{description && <Description>{description}</Description>}
		</CheckboxField>
	)
}
