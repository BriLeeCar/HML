'use client'
import type { ActionDispatch } from 'react'
import { FormField, Input, Label } from '~/components/Form'
import type { ReducerSetField } from '../lib'

export const SubtitleField = ({
	subtitle,
	dispatchDataAction,
}: {
	subtitle: string | null
	dispatchDataAction: ActionDispatch<
		[action: ReducerSetField<'subtitle'>]
	>
}) => {
	return (
		<FormField asCol>
			<Label htmlFor='subtitle'>Subtitle</Label>
			<Input
				id='subtitle'
				defaultValue={subtitle ?? undefined}
				onChange={(e) =>
					e.currentTarget.value
					&& dispatchDataAction({
						type: 'SET_FIELD',
						payload: [
							{
								fieldKey: 'subtitle',
								fieldValue: e.currentTarget.value,
							},
						],
					})
				}
			/>
		</FormField>
	)
}
