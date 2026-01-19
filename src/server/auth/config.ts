import { PrismaAdapter } from '@auth/prisma-adapter'
import { type NextAuthConfig, type User } from 'next-auth'
import db from '~/server/prisma/db'
import type { tTokenCB } from '~/server/types'
import { CredentialsConfig } from './lib/credentials'

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
		session: ({ token, session }) => {
			Object.assign(session.user, {
				roles: mergeUserRoles(token, session.user as User),
				sessionId: session.user.id ?? 0,
				id: token.sub,
			})

			return {
				...session,
				token: token,
			}
		},
		jwt: ({ token, user }: { token: tTokenCB; user: User }) => {
			if (Object.keys(token).includes('picture')) delete (token as AnySafe).picture

			token.roles = mergeUserRoles(token, user)
			return token
		},
		redirect: async data => data.baseUrl + '/admin',
	},
} satisfies NextAuthConfig

const mergeUserRoles = (token: tTokenCB, user: User): Auth.Role[] => [
	...new Set([...(user?.roles ?? []), ...(token.roles ?? [])]),
]
