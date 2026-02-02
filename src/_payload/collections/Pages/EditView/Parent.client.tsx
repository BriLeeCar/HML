'use client'

import type { Page } from '@/payload-types'
import { SelectInput, useField } from '@payloadcms/ui'
import type { FieldRef, TextFieldClientProps } from 'payload'

export const ParentClientField = ({
	parents,
	path,
}: TextFieldClientProps<Page, 'parent'> & { parents: Page[] }) => {
	const field = useField<FieldRef<Page, typeof path>>({ path })
	const fieldValues = field.value ? field.value.toString().split('/') : []

	return (
		<SelectInput
			options={parents.map(p => ({
				label: `${p.path} (${p.title})`,
				value: p.id.toString(),
			}))}
			name={'parent'}
			path={path}
			value={fieldValues}
			hasMany
			onChange={selected => {
				const values = (selected as Array<{ value: string }>).map(s => s.value)
				field.setValue(values.join('/'))
			}}
		/>
	)
}
