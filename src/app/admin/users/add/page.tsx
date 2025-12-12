import { LayoutWrapper } from '@/admin/_components/client/Wrapper'
import { api } from 'query'
import { NewUserForm } from './Base'

export default async function NewUserPage() {
	const userRoles = await api.user.getUserRoles()

	return (
		<LayoutWrapper title='Add New User'>
			<NewUserForm roles={userRoles} />
		</LayoutWrapper>
	)
}
