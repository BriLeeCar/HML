import type {
	Country,
	Currency,
	PathwayDocuments,
	PathwayPipeline,
	PathwayRestrictedNationality,
	PathwayType,
} from '~/server/prisma/generated'

declare global {
	type PrismaPathwayDuration = {
		min: number
		max: number
		separate: boolean
	}

	type PrismaPathway = {
		documents: Array<Omit<PathwayDocuments, 'cost'> & { cost: number }>
		categories: number[]
		piplines: PathwayPipeline[]
		restrictedNationalities: PathwayRestrictedNationality[]
		name: string
		id: number
		countryCode: string
		link: string
		description: string
		type: PathwayType
		discordHandle: string
		createdAt: Date
		updatedAt: Date
		currencyCode: string
		cost: {
			min: number
			max: number
			na: boolean
		}
		duration: {
			min: number
			max: number
			note: string
			na: boolean
		}
		processTime: {
			min: number
			max: number
			note: string
			na: boolean
		}
		renewal: {
			min: number
			max: number
			note: string
			na: boolean
		}
		notes: { note: string; counter: number }[]
		limitations: { note: string; counter: number }[]
		requirements: { note: string; counter: number }[]
		restrictions: { note: string; counter: number }[]
		residency: string
		citizenship: string
		reunification: string
	}

	type PrismaErrors = {
		countryCode: string[]
		name: string[]
		link: string[]
		description: string[]
		cost: {
			min: string[]
			max: string[]
			base: string[]
		}
		duration: {
			min: string[]
			max: string[]
			base: string[]
		}
		processTime: {
			min: string[]
			max: string[]
			base: string[]
		}
		renewal: {
			min: string[]
			max: string[]
			base: string[]
		}
		notes: string[]
		limitations: string[]
		requirements: string[]
		restrictions: string[]
		categories: string[]
		documents: string[]
	}

	type PrismaTrackers = {
		counters: {
			notes: number
			limitations: number
			requirements: number
			restrictions: number
			documents: number
		}
		durations: {
			duration: PrismaPathwayDuration
			processTime: PrismaPathwayDuration
			renewal: PrismaPathwayDuration
		}
		piplines: Record<PipelineKeys, boolean>
		utilities: {
			countryData: (Country & { currencies: Currency[] }) | null
		}
	}

	type PipelineKeys = Lowercase<`${PathwayPipeline['pipeline']}`> | 'renewal'

	type Query = {
		date: Date
		query: PrismaPathway
		errors: PrismaErrors
	} & PrismaTrackers

	// #region ? CASING TYPES
	/**
	 * Converts a string to Title Case by capitalizing the first letter of each word.
	 *
	 * @template T - The input string to be converted to Title Case
	 *
	 * @returns - The input string converted to Title Case
	 *
	 * @example
	 * ```ts
	 * type Title = TitleCase<'hello world'> // Result: 'Hello World'
	 * type Title2 = TitleCase<'pathway to citizenship'> // Result: 'Pathway To Citizenship'
	 * ```
	 *
	 * @note Unused in this codebase currently but may be useful for future features, so retained.
	 */
	type TitleCase<T extends string> = Capitalize<ToTitleCase<T>>

	type IsLetter<L extends string> =
		L extends Capitalize<L> & Uncapitalize<L> ? false
		: L extends Capitalize<L> | Uncapitalize<L> ? true
		: false

	type IsCapitalized<L extends string> =
		IsLetter<L> extends true ?
			L extends Capitalize<L> ?
				' '
			:	''
		:	''

	type ToTitleCase<S extends string> =
		S extends `${infer F}${infer L}` ? `${F}${IsCapitalized<L>}${ToTitleCase<L>}` : S
	// #endregion
}
