'use client'
import { useState, type ActionDispatch } from 'react'
import { FormField, Input, Label } from '~/components'
import type { ReducerSetField } from '../lib'

export const SlugField = ({
	slug,
	dispatchDataAction,
}: {
	slug: string
	dispatchDataAction: ActionDispatch<
		[action: ReducerSetField<'slug'>]
	>
}) => {
	const [isLocked, setIsLocked] = useState(true)

	return (
		<>
			<FormField asCol>
				<Label>Slug</Label>
				<Input
					icon={{
						before:
							isLocked ? 'LockKeyholeIcon' : 'LockKeyholeOpenAltIcon',
						onClick: () => {
							setIsLocked((prev) => !prev)
						},
					}}
					defaultValue={slug}
					onChange={(e) =>
						dispatchDataAction({
							type: 'SET_FIELD',
							payload: [
								{ fieldKey: 'slug', fieldValue: e.target.value },
							],
						})
					}
					disabled={isLocked}
				/>
			</FormField>
		</>
	)
}
