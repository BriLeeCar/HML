import { FormError } from '@/admin/_components'
import { Field, Label } from '@/admin/_components/catalyst'
import type { FieldElProps } from '../../_lib'

export const OverviewField = ({ ...props }: FieldElProps) => {
	return (
		<Field {...props.fieldProps}>
			<Label
				{...props.labelProps}
				required={props.required}>
				{props.label}
			</Label>
			{props.children}
			<FormError message={props.errorMessages} />
		</Field>
	)
}
