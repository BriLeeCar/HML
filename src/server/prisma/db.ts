import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from '~/env'
import { PrismaClient } from './generated/client'

const createPrismaClient = () => {
	return new PrismaClient({
		accelerateUrl: env.PRISMA_ACCELERATE_URL,
		errorFormat: 'pretty',
		log: env.NODE_ENV == 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
	}).$extends(withAccelerate())
}

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined
}

const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db
