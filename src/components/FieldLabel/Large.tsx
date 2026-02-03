import type { Field, FieldLabelServerProps } from 'payload'

const LabelLarge = ({ label, ...props }: FieldLabelServerProps<Field>) => {
	const labelString = (props.field.type == 'group' ? props.field.label : label) as
		| string
		| undefined

	return <span className='text-xl uppercase font-semibold'>{labelString}</span>
}

export default LabelLarge
