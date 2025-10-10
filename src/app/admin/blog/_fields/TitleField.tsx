'use client'

import type { ActionDispatch } from 'react'
import { FormField, Input, Label } from '~/components/index'
import type { ReducerSetField } from '../lib'

export const TitleField = ({
	title,
	dispatchDataAction,
}: {
	title?: string
	dispatchDataAction: ActionDispatch<
		[action: ReducerSetField<'name' | 'slug'>]
	>
}) => {
	const handleTitleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatchDataAction({
			type: 'SET_FIELD',
			payload: [
				{ fieldKey: 'name', fieldValue: e.target.value },
				{
					fieldKey: 'slug',
					fieldValue: e.target.value
						.toLowerCase()
						.trim()
						.replace(/[^a-z0-9]+/g, '-')
						.replace(/^-+|-+$/g, ''),
				},
			],
		})
	}
	return (
		<FormField
			asCol
			className='mb-4'>
			<Label htmlFor='name'>Title</Label>
			<Input
				id='name'
				defaultValue={title}
				onChange={handleTitleChange}
			/>
		</FormField>
	)
}
