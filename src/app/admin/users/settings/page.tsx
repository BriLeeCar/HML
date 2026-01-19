import { LayoutWrapper } from '@/admin/_components/client'
import { verify } from '@/admin/_lib/verify'
import { AdminUsersSettingsBase } from './Base'

const ProfilePage = async () => {
	const user = await verify()

	return (
		<LayoutWrapper>
			<AdminUsersSettingsBase user={user} />
		</LayoutWrapper>
	)
}

export default ProfilePage
