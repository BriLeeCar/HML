import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'
import { api } from '~/serverQuery'

export const verify = async (params?: string[]) => {
	const user = await api.user.current()
	if (!user) {
		redirect('/admin/auth/signin')
	}
	if (params && params.includes('roles')) {
		const roles = user.roles.map(r => ({
			name: r.role.name,
			id: r.role.id,
		}))
		return { ...user, roles }
	}
	return user
}

export const verifyAdmin = async () => {
	const authed = (await verifyRoles()) as Auth.Role['name'][]
	return authed.includes('admin')
}

export const verifyRoles = async (): Promise<Auth.Role['name'][]> => {
	const authed = await auth()
	if (authed) {
		return getRoles(authed) as Auth.Role['name'][]
	} else {
		return []
	}
}

export const getRoles = (
	session: Auth.Session,
	byId: boolean | undefined = false
): Auth.Role['name' | 'id'][] => {
	if (!session?.user) return []

	if (byId == true) {
		return session.user.roles.map(r => r.id) as Auth.Role['id'][]
	} else return session.user.roles.map(r => r.name) as Auth.Role['name'][]
}
