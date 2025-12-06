import { LayoutWrapper } from '@/admin/_components/Wrapper'
import { api } from 'query'
import { NewUserForm } from './_components/NewUserForm'

export default async function NewUserPage() {
	const userRoles = await api.user.getUserRoles()

	return (
		<LayoutWrapper
			title='Add New User'
			breadcrumbs={[
				{ label: 'Admin', href: '/admin' },
				{ label: 'Users', href: '/admin/utilities/users' },
				{ label: 'New', href: '/admin/utilities/users/new' },
			]}>
			<NewUserForm roles={userRoles} />
		</LayoutWrapper>
	)
}
