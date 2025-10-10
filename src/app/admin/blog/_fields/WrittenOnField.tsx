'use client'

import { FormField, Input, Label } from '~/components'
import { toShortDate } from '~/lib/date'

export const WrittenOnField = () => {
	return (
		<FormField asCol>
			<Label>Written On</Label>
			<Input
				defaultValue={toShortDate(new Date())}
				disabled
			/>
		</FormField>
	)
}
