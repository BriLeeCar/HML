import { Field, Input, Label } from '@/admin/_components/catalyst'

export const FieldName = ({ name }: { name: string }) => {
	return (
		<Field>
			<Label required>Name</Label>
			<Input
				name='name'
				value={name}
				disabled
			/>
		</Field>
	)
}
