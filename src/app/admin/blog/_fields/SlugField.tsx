'use client'
import type { ActionDispatch } from 'react'
import { Checkbox, CheckboxField } from '../../_components/checkbox'
import { Field, FieldGroup, Label } from '../../_components/fieldset'
import { Input } from '../../_components/input'
import { ReducerSetField } from '../lib'

export const SlugField = ({
	slug,
	dispatchDataAction,
}: {
	slug: string
	dispatchDataAction: ActionDispatch<
		[action: ReducerSetField<'slug'>]
	>
}) => {
	return (
		<FieldGroup>
			<Field className='mb-2 flex items-baseline gap-4 lg:block'>
				<Label>Slug</Label>
				<Input
					defaultValue={slug}
					onChange={(e) =>
						dispatchDataAction({
							type: 'SET_FIELD',
							payload: [
								{ fieldKey: 'slug', fieldValue: e.target.value },
							],
						})
					}
					disabled
				/>
			</Field>
			<CheckboxField className='ml-12 lg:ml-0'>
				<Label>Unlock?</Label>
				<Checkbox />
			</CheckboxField>
		</FieldGroup>
	)
}
