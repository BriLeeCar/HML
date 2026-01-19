import { LayoutWrapper } from '@/admin/_components/client/Wrapper'
import { NotAuthorized } from '@/admin/_components/NotAuthorized'
import { verifyAdmin } from '@/admin/_lib/verify'
import { NewUserForm } from './Base'

export default async function NewUserPage() {
	if (!(await verifyAdmin())) {
		return <NotAuthorized title='Add New User' />
	}

	return (
		<LayoutWrapper title='Add New User'>
			<NewUserForm />
		</LayoutWrapper>
	)
}
