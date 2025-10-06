'use client'
import type { ActionDispatch } from 'react'
import { Field, Label } from '../../_components/fieldset'
import { Input } from '../../_components/input'
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
		<Field className='flex items-baseline gap-4 lg:block'>
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
		</Field>
	)
}
