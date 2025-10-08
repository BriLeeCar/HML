'use client'
import type { ActionDispatch } from 'react'
import { FormField, Input, Label } from '~/components'
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
		<FormField asCol>
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
		</FormField>
	)
}
