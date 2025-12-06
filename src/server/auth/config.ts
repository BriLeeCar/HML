import { PrismaAdapter } from '@auth/prisma-adapter'
import { type DefaultSession, type NextAuthConfig } from 'next-auth'

import db from '~/server/prisma/db'
import { CredentialsConfig } from './lib/credentials'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
			role: Queried.User.Role['id']
		} & DefaultSession['user']
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
	providers: [CredentialsConfig],
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		session: data => {
			return {
				...data.session,
				user: {
					sessionId: data.session.user.id ?? 0,
					id: data.token.sub,
				},
			}
		},
		jwt: data => {
			return data.token
		},
		redirect: async data => {
			return data.baseUrl + '/admin'
		},
	},
} satisfies NextAuthConfig
