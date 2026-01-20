'use client'

import { useMemo } from 'react'
import { api } from '~/trpc/react'
import { UserRoleContext } from './RoleContext'

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
	const app = api.user.getUsersRoles.useQuery()

	const userRoles = useMemo(
		() => ({
			roles: app.data?.roles ?? [],
		}),
		[app.data]
	)

	return <UserRoleContext.Provider value={userRoles}>{children}</UserRoleContext.Provider>
}
