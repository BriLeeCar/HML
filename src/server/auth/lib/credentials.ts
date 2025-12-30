import Credentials from 'next-auth/providers/credentials'

import { type tUser, type tUserKey } from '~/server/api/zod'
import { SignInPath } from './signin'
import { SignUpPath } from './signup'

export type CredentialsBase = {
	username: tUser['name']
	password: tUser['secret']
	key: tUserKey['key']
}

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
	authorize: async credentials => {
		if (!credentials) return null
		if (!credentials.key) {
			console.log('SIGN IN')
			return SignInPath(credentials as CredentialsBase)
		} else {
			console.log('SIGN up')
			return SignUpPath(credentials as CredentialsBase)
		}
	},
})
