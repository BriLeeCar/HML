import type * as PrismaType from '@prisma/client'

type MinMaxNote = {
	min: number
	max: number
	note: string | null
}

type PathwayBase = Omit<PrismaType.Pathway, 'duration' | 'processTime' | 'renewal'>

declare global {
	// type Prisma = PrismaType
	namespace Prisma {
		type Country = PrismaType.Country
		type Pathway = PathwayBase & {
			duration: MinMaxNote
			processTime: MinMaxNote
			renewal: MinMaxNote
		}
	}
}
export {}
