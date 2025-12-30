import { PrismaAdapter } from '@auth/prisma-adapter'
import { type DefaultSession, type NextAuthConfig } from 'next-auth'

import db from '~/server/prisma/db'
import type { Roles } from '~/server/prisma/generated'
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
			role: Roles['id']
		} & DefaultSession['user']
	}
	interface User {
		role?: Roles['id']
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
				token: data.token,
				...data.session,
				user: {
					sessionId: data.session.user.id ?? 0,
					id: data.token.sub,
					role: data.token.role as Roles['id'],
				},
			}
		},
		jwt: data => {
			const token = data.token
			if (data.user) {
				token.role = (data.user as { role: Roles['id'] }).role
			}
			return token
		},
		redirect: async data => {
			return data.baseUrl + '/admin'
		},
	},
} satisfies NextAuthConfig
