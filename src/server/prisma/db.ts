import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from './generated/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
	globalForPrisma.prisma
	|| new PrismaClient({
		accelerateUrl: process.env.PRISMA_DATABASE_URL!,
		log: ['error', 'warn'],
	}).$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
