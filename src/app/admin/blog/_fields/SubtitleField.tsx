'use client'
import type { ActionDispatch } from 'react'
import { FormField, Input, Label } from '~/components/Form'
import { ReducerSetField } from '../lib'

export const SubtitleField = ({
	subtitle,
	dispatchDataAction,
}: {
	subtitle: string
	dispatchDataAction: ActionDispatch<
		[action: ReducerSetField<'subtitle'>]
	>
}) => {
	return (
		<FormField asCol>
			<Label>Subtitle</Label>
			<Input
				defaultValue={subtitle}
				onChange={(e) =>
					dispatchDataAction({
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
