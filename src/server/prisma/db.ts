import { PrismaClient } from '@prisma/client'

import { env } from '../../env'

const createPrismaClient = () =>
	new PrismaClient({
		log: ['error', 'warn'],
	})

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined
}

const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// const prisma =
// 	globalForPrisma.prisma
// 	|| new PrismaClient({
// 		accelerateUrl: process.env.PRISMA_DATABASE_URL!,
// 		log: ['error', 'warn'],
// 	}).$extends(withAccelerate())

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default db
