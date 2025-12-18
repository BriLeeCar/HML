import { type ReactNode } from 'react'
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
