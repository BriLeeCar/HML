import { cls } from '@/lib/cls'
import type { CollapsibleFieldServerProps, GenericLabelProps } from 'payload'
import type { FC } from 'react'

const Label: FC<
	{
		field: CollapsibleFieldServerProps['field']
	} & GenericLabelProps
> = ({ ...props }) => {
	const data = props.field.admin?.components?.Label as Record<string, any> | undefined

	const className = data?.serverProps?.className || ''

	return <span className={cls('font-semibold', className)}>{props.field.label as string}</span>
}

export default Label
