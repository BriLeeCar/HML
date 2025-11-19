import { Field } from '../fieldset'

export const FormSection = ({ ...props }: Props) => {
	return <section {...props} />
}

export const FormField = ({
	label: { ...labelProps },
	input: { ...inputProps },
	field: { ...fieldProps },
}) => {
	return <Field {...props} />
}
