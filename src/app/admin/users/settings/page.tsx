import { LayoutWrapper } from '@/admin/_components/client'
import { redirect } from 'next/navigation'
import { api } from '~/serverQuery'
import { AdminUsersSettingsBase } from './Base'

const ProfilePage = async () => {
	const user = await api.user.current()

	if (!user) {
		redirect('/admin/auth/signin')
	}

	return (
		<LayoutWrapper>
			<AdminUsersSettingsBase user={user} />
		</LayoutWrapper>
	)
}

export default ProfilePage
