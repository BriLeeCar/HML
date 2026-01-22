import Credentials from 'next-auth/providers/credentials'
import type { CredentialsBase } from '~/server/types'
import { SignInPath } from './signin'
import { SignUpPath } from './signup'

export const CredentialsConfig = Credentials({
	name: 'HML',
	type: 'credentials',
	credentials: {
		username: {
			label: 'Name',
			type: 'text',
			placeholder: 'Jane',
			name: 'username',
			required: true,
		},
		password: {
			label: 'Password',
			type: 'password',
			name: 'password',
			required: true,
		},
		key: { label: 'Key', type: 'text', name: 'key' },
	},

	authorize: async (credentials): Promise<Auth.User | null> => {
		if (!credentials) return null
		let user = null
		if (!credentials.key) {
			user = await SignInPath(credentials as CredentialsBase)
		} else {
			if (credentials.key != undefined) {
				user = await SignUpPath(credentials as Required<CredentialsBase>)
			}
		}

		if (user?.roles?.length) {
			const roles = user.roles
				.map(role => {
					if (role && typeof role === 'object' && 'role' in role) {
						return (role as { role?: Auth.Role }).role ?? null
					}
					if (role && typeof role === 'object' && 'id' in role && 'name' in role) {
						return role as Auth.Role
					}
					return null
				})
				.filter((role): role is Auth.Role => Boolean(role))

			Object.assign(user, { roles })
		}

		return user as unknown as Auth.User | null
	},
})
