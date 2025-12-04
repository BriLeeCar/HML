import type * as Prisma from '~/server/prisma/generated/browser'

declare global {
	// // #region OLD DATA
	// type PathwaysKeys<E> = {
	// 	[K in keyof Pathways]: Pathways[K] extends E ? K : never
	// }[keyof Pathways]

	// type PathwaysPayloads<K extends keyof Pathways, P> = {
	// 	[Key in K]: Pathways[Key] extends Pathways[K] ?
	// 		{
	// 			field: K
	// 			payload: P
	// 		}
	// 	:	never
	// }

	// // #region ? CATEGORY
	// type PathwaysCategoryField = { value: Prisma.PathwayTypes['id'][] }
	// type PathwaysCategoryKeys = PathwaysKeys<PathwaysCategoryField>
	// type PathwaysCategoryPayload = PathwaysPayloads<PathwaysCategoryKeys, { value: number[] }>
	// // #endregion ?

	// // #region ? STRING
	// type PathwaysStringKeys = PathwaysKeys<PathwaysStringField>

	// type PathwaysStringField = {
	// 	value: string | null
	// 	error: string[]
	// 	visited: boolean
	// }

	// type PathwaysStringPayload = PathwaysPayloads<PathwaysStringKeys, PathwaysStringField['value']>
	// // #endregion ?

	// // #region ? BOOLEAN
	// type PathwaysBooleanKeys = PathwaysKeys<PathwaysBooleanField>
	// type PathwaysBooleanField = {
	// 	value: boolean
	// }

	// type PathwaysBooleanPayload = PathwaysPayloads<PathwaysBooleanKeys, PathwaysBooleanField['value']>
	// // #endregion ?

	// // #region ? COST UOM
	// type PathwaysCostUOMKeys = PathwaysKeys<PathwaysCostUOMField>

	// type PathwaysCostUOMField = {
	// 	value:
	// 		| {
	// 				abbr: string | null
	// 				currencySymbol: string | null
	// 		  }
	// 		| {
	// 				abbr: null
	// 				currencySymbol: null
	// 		  }
	// 	error: string[]
	// }
	// type PathwaysCostUOMPayload = PathwaysPayloads<PathwaysCostUOMKeys, PathwaysCostUOMField>

	// // #endregion ?

	// // #region ? DURATION
	// type PathwaysDurationKeys = PathwaysKeys<PathwaysDurationField>

	// type PathwaysDurationField = {
	// 	value: {
	// 		min: {
	// 			value: number
	// 			error: string[]
	// 			visited: boolean
	// 		}
	// 		max: {
	// 			value: number
	// 			error: string[]
	// 			visited: boolean
	// 		}
	// 		uom: {
	// 			value:
	// 				| {
	// 						base: string | null
	// 						value: number
	// 						label: string | null
	// 				  }
	// 				| {
	// 						base: null
	// 						value: number
	// 						label: null
	// 				  }
	// 			error: string[]
	// 		}
	// 	}
	// 	error: string[]
	// }

	// type PathwaysDurationPayload = PathwaysPayloads<PathwaysDurationKeys, PathwaysDurationField>

	// // #endregion ?

	// // #region ? COST
	// type PathwaysMinMaxKeys = PathwaysKeys<PathwaysMinMaxField>

	// type PathwaysMinMaxField = {
	// 	value: {
	// 		min: {
	// 			value: number
	// 			error: string[]
	// 			visited: boolean
	// 		}
	// 		max: {
	// 			value: number
	// 			error: string[]
	// 			visited: boolean
	// 		}
	// 	}
	// 	error: string[]
	// }

	// type PathwaysMinMaxPayload = PathwaysPayloads<PathwaysMinMaxKeys, PathwaysMinMaxField>

	// // #endregion ?

	// // #region ? ARRAYS

	// // #endregion ?

	// // #region ? BASE PATHWAY DATA

	// /**
	//  * Defines the complete structure of a pathway data object
	//  *
	//  * @returns An object mapping each key in Pathways to its corresponding field type
	//  * @see `PATHWAY_BASE` in `constants.ts` for default values
	//  */
	// type Pathways = {
	// 	countryCode: PathwaysStringField
	// 	id: PathwaysStringField
	// 	name: PathwaysStringField
	// 	link: PathwaysStringField
	// 	description: PathwaysStringField
	// 	categories: PathwaysCategoryField
	// 	citizenshipNote: PathwaysStringField
	// 	reunificationNote: PathwaysStringField
	// 	residencyNote: PathwaysStringField
	// 	isRenewable: PathwaysBooleanField
	// 	hasNationalityRestrictions: PathwaysBooleanField
	// 	renewableSameAsInitial: PathwaysBooleanField
	// 	reunificationPossible: PathwaysBooleanField
	// 	residencyPossible: PathwaysBooleanField
	// 	citizenshipPossible: PathwaysBooleanField
	// 	hasLimitations: PathwaysBooleanField
	// 	cost: PathwaysMinMaxField
	// 	costUom: PathwaysCostUOMField
	// 	duration: PathwaysDurationField
	// 	processingTime: PathwaysDurationField
	// 	processTime: PathwaysDurationField
	// 	renewableDuration: PathwaysDurationField
	// 	notes: PathwaysNoteField
	// 	documents: PathwaysDocumentsField
	// 	requirements: PathwaysRequirementsField
	// 	renewableNotes: PathwaysRenewableNotesField
	// 	limitations: PathwaysLimitationsField
	// 	restrictedNationalities: PathwaysRestrictedNationalitiesField
	// 	// #endregion ?
	// }
	// // #endregion

	type PrismaPathway = {
		documents: Array<Omit<Prisma.PathwayDocuments, 'cost'> & { cost: number }>
		categories: Prisma.PathwayTypes[]
		piplines: Prisma.PathwayPipeline[]
		restrictedNationalities: Prisma.PathwayRestrictedNationality[]
		name: string
		id: number
		countryCode: string
		link: string
		description: string
		type: Prisma.PathwayType
		discordHandle: string
		createdAt: Date
		updatedAt: Date
		currencyCode: string
		cost: {
			min: number
			max: number
		}
		duration: {
			min: number
			max: number
			note: string
		}
		processTime: {
			min: number
			max: number
			note: string
		}
		renewal: {
			min: number
			max: number
			note: string
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
		notes: string[]
		limitations: string[]
		requirements: string[]
		restrictions: string[]
		documents: Array<string>
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
			duration: number
			processTime: number
			renewal: number
		}
		piplines: Record<PipelineKeys, boolean>
		utilities: {
			countryData: (Prisma.Country & { currencies: Prisma.Currency[] }) | null
		}
	}

	type PipelineKeys = Lowercase<`${Prisma.PathwayPipelines}`> | 'renewal'

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
}
