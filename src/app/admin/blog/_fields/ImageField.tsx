'use client'
import type { ActionDispatch } from 'react'
import { Field, Label } from '../../_components/fieldset'
import { Input } from '../../_components/input'
import { ReducerSetField } from '../lib'

export const ImageField = ({
	image,
	dispatchDataAction,
}: {
	image?: File | boolean | null
	dispatchDataAction: ActionDispatch<
		[action: ReducerSetField<'image'>]
	>
}) => {
	if (image || !image) {
	}
	return (
		<Field className='flex items-baseline gap-4 lg:block'>
			<Label>Image</Label>
			<Input
				accept='image/*'
				type='file'
				defaultValue={''}
				onChange={(e) =>
					// @ts-expect-error FileList is not null here
					setImage
					&& dispatchDataAction({
						type: 'SET_FIELD',
						payload: [
							{
								fieldKey: 'image',
								fieldValue: e.currentTarget.files?.[0] ? true : false,
							},
						],
					})
				}
			/>
		</Field>
	)
}
