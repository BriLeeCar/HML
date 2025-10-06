import { PrismaClient as PrismaClientDev } from '@prisma/client'
import { PrismaClient, User } from '@prisma/client/edge'

import { withAccelerate } from '@prisma/extension-accelerate'

import { env } from '../../env'

const createPrismaClient = () =>
	createProd().$extends({
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

const createProd = () =>
	env.NODE_ENV != 'development' ?
		new PrismaClient({
			log: ['error'],
		}).$extends(withAccelerate())
	:	new PrismaClientDev({
			log: ['error', 'query', 'info', 'warn'],
		})

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db
