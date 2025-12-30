import { LayoutWrapper } from '@/admin/_components/client/Wrapper'
import { NewUserForm } from './Base'

export default async function NewUserPage() {
	return (
		<LayoutWrapper title='Add New User'>
			<NewUserForm />
		</LayoutWrapper>
	)
}
