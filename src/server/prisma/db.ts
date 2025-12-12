import { PrismaClient } from './generated/client'

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

export default db
