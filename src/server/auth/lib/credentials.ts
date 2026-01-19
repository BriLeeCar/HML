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
			user = SignInPath(credentials as CredentialsBase)
		} else {
			user = SignUpPath(credentials as CredentialsBase)
		}
		if (user != null) {
			Object.entries(user).forEach(([key, value]) => {
				if (key == 'roles' && Array.isArray(value)) {
					Object.assign(user, {
						roles: value.map(r => ({
							id: r.role.id,
							name: r.role.name,
						})),
					})
				}
			})
		}

		return user as unknown as Auth.User | null
	},
})
