import type { DefaultSession, Session as NextAuthSession, User as NextAuthUser } from 'next-auth'

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
			roles: Auth.Role[]
		} & DefaultSession['user']
	}

	interface User {
		roles?: Auth.Role[]
	}
}

declare global {
	namespace Auth {
		type Role = Roles

		type User = Omit<NextAuthUser, 'roles'> & {
			roles: Auth.Role[]
		}

		type Session = Omit<NextAuthSession, 'user'> & {
			user: Auth.User
		}
	}
}
