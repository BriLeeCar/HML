'use client'
import { Field, Label } from '@admin/_components/fieldset'
import { Input } from '~/components'
import { toShortDate } from '~/lib/date'

export const WrittenOnField = () => {
	return (
		<Field>
			<Label>Written On</Label>
			<Input
				defaultValue={toShortDate(new Date())}
				disabled
			/>
		</Field>
	)
}
