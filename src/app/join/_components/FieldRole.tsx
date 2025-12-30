import { Field, Input, Label } from '@/admin/_components/catalyst'
import type { User } from '../fetchData'

export const FieldRole = ({ role }: { role: User['role'] }) => {
	return (
		<Field>
			<Label required>Role</Label>
			<Input
				name='role'
				value={role.label}
				disabled
			/>
		</Field>
	)
}
