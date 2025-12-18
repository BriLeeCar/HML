import { api } from 'query'
import type { Roles } from '~/server/prisma/generated'

export const verifyRole = async (requiredRole: Roles['id']) => {
	const { roles } = await api.user.getUsersRoles()

	if (roles.length == 0 || !roles?.some(role => role === requiredRole)) {
		throw new Error('User does not have the required role')
	}
}
