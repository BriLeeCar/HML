'use client'
import type { ActionDispatch } from 'react'
import { Field, Label } from '../../_components/fieldset'
import { Input } from '../../_components/input'
import { ReducerSetField } from '../lib'

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
		<Field className='flex items-baseline gap-4 lg:block'>
			<Label>Title</Label>
			<Input
				defaultValue={title}
				onChange={handleTitleChange}
			/>
		</Field>
	)
}
