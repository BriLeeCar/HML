import { PrismaClient, User } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { env } from '../../env'

const createPrismaClient = () =>
	new PrismaClient({
		log:
			env.NODE_ENV === 'development' ?
				[
					'query',
					{ level: 'error', emit: 'event' },
					{ level: 'warn', emit: 'event' },
				]
			:	['error'],
	})
		.$extends(withAccelerate())
		.$extends({
			result: {
				user: {
					fullName: {
						needs: { firstName: true, lastName: true },
						compute(user: User) {
							return `${user.firstName} ${user.lastName}`
						},
					},
				},
			},
		})

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db
