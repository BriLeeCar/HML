import type { Role, User } from '@/payload-types'
import type { PayloadRequest } from 'payload'

const roleIds = {
	director: 2,
	admin: 2,
	lead: 3,
	head: 4,
	volunteer: 1,
}

const getRoleMatch = (user: Partial<User> | null | undefined, roleId: number): boolean => {
	if (!user || !user.sessions) return false
	if (user.roles && Array.isArray(user.roles)) {
		return (
			user.roles.includes(roleId) || user.roles.filter(r => (r as Role).id == roleId).length > 0
		)
	}
	return false
}

type AuthArgs = { req: PayloadRequest }

export const Auth = {
	role: (role: keyof typeof roleIds) => {
		return ({ req }: AuthArgs) => getRoleMatch(req.user, roleIds[role])
	},
	minRole: (role: keyof typeof roleIds) => {
		return ({ req }: AuthArgs) => {
			const roleHierarchy = ['volunteer', 'lead', 'head', 'admin', 'director']
			const roleIndex = roleHierarchy.indexOf(role)
			if (roleIndex === -1) return false

			for (let i = roleIndex; i < roleHierarchy.length; i++) {
				if (getRoleMatch(req.user, roleIds[roleHierarchy[i] as keyof typeof roleIds])) {
					return true
				}
			}
			return false
		}
	},
	team: (teamId: number) => {
		return ({ req }: AuthArgs) => {
			const { user } = req
			if (!user || !user.sessions) return false
			if (user.teams && Array.isArray(user.teams)) {
				return (
					user.teams.includes(teamId) || user.teams.filter(t => (t as number) == teamId).length > 0
				)
			}
			return false
		}
	},
	self: ({ req }: AuthArgs) => {
		const { user } = req
		const routeUserId = req.routeParams?.id ? Number(req.routeParams.id) : null
		if (!user || !user.sessions || !routeUserId) return false
		return user.id === routeUserId
	},
}
