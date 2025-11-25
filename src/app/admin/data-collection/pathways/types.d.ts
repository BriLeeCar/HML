import { ActionDispatch } from 'react'
import { DB } from '~/server/db/db'

declare global {
	// #region ? STRING
	type PathwaysStringKeys =
		| 'countryId'
		| 'pathwayId'
		| 'officialName'
		| 'officialLink'
		| 'description'
		| 'category'
		| 'citizenshipNote'
		| 'reunificationNote'
		| 'residencyNote'
		| 'discordHandle'

	type PathwaysStringField = {
		value: string | null
		error: string[]
	}

	type PathwaysStringPayload = {
		[K in PathwaysStringKeys]: {
			field: K
			payload: string | null
		}
	}
	// #endregion ?

	// #region ? BOOLEAN
	type PathwaysBooleanKeys =
		| 'isRenewable'
		| 'hasNationalityRestrictions'
		| 'renewableSameAsInitial'
		| 'reunificationPossible'
		| 'residencyPossible'
		| 'citizenshipPossible'
		| 'hasLimitations'

	type PathwaysBooleanField = {
		value: boolean
	}

	type PathwaysBooleanPayload = {
		[K in PathwaysBooleanKeys]: {
			field: K
			payload: boolean
		}
	}
	// #endregion ?

	// #region ? COST UOM
	type PathwaysCostUOMKeys = 'costUom'

	type PathwaysCostUOMField = {
		value:
			| {
					abbr: string | null
					currencySymbol: string | null
			  }
			| {
					abbr: null
					currencySymbol: null
			  }
		error: string[]
	}
	type PathwaysCostUOMPayload = {
		[K in PathwaysCostUOMKeys]: {
			field: K
			payload: Pathways[K]
		}
	}

	// #endregion ?

	// #region ? DURATION
	type PathwaysDurationKeys = 'duration' | 'processingTime' | 'renewableDuration'

	type PathwaysDurationField = {
		value: {
			min: {
				value: number
				error: string[]
			}
			max: {
				value: number
				error: string[]
			}
			uom: {
				value:
					| {
							base: string | null
							value: number
							label: string | null
					  }
					| {
							base: null
							value: number
							label: null
					  }
				error: string[]
			}
		}
		error: string[]
	}

	type PathwaysDurationPayload = {
		[K in PathwaysDurationKeys]: {
			field: K
			payload: Pathways[K]
		}
	}

	// #endregion ?

	// #region ? COST
	type PathwaysMinMaxKeys = PathwaysDurationKeys | 'cost'

	type PathwaysMinMaxField = {
		value: {
			min: {
				value: number
				error: string[]
			}
			max: {
				value: number
				error: string[]
			}
		}
		error: string[]
	}

	type PathwaysMinMaxPayload = {
		[K in PathwaysMinMaxKeys]: {
			field: K
			payload: Pathways[K]
		}
	}

	// #endregion ?

	// #region ? ARRAYS
	type PathwaysArrayKeys =
		| 'notes'
		| 'documents'
		| 'requirements'
		| 'renewableNotes'
		| 'limitations'
		| 'restrictedNationalities'

	type PathwaysArrayField<V> = {
		value: Array<V & { counter: number } & { error: string[] }>
		counter: number
	}

	type PathwayNotesPayload = {
		[K in PathwaysArrayKeys]:
			| {
					type: 'add'
					field: K
					payload: null
			  }
			| {
					type: 'delete'
					field: K
					payload: number
			  }
			| {
					type: 'update'
					field: K
					payload: {
						counter: number
						value: Pathways[K]['value'][number]
					}
			  }
	}

	type PathwaysNoteField = PathwaysArrayField<{ note: string }>
	type PathwaysDocumentsField = PathwaysArrayField<{ title: string; cost: number; note: string }>
	type PathwaysRequirementsField = PathwaysArrayField<{ note: string }>
	type PathwaysRenewableNotesField = PathwaysArrayField<{ note: string }>
	type PathwaysLimitationsField = PathwaysArrayField<{ note: string }>
	type PathwaysRestrictedNationalitiesField = PathwaysArrayField<{ country: string; note: string }>
	// #endregion ?

	// #region ? BASE PATHWAY DATA

	/**
	 * Defines the structure of actions that can be dispatched to update pathway data from the form
	 *
	 * @template K - The keys of the Pathways type representing different fields
	 * @template V - The payload type associated with each field in the Pathways type
	 *
	 * @returns An object mapping each key in Pathways to its corresponding payload type
	 *
	 * @example
	 * ```ts
	 * const action: PathwaysActions['officialName'] = {
	 *   field: 'officialName',
	 *   payload: 'New Official Name'
	 * }
	 * ```
	 *
	 */
	type PathwaysActions = {
		[K in keyof Pathways]: PathwaysPayload[K]
	}

	/**
	 * Combines all individual payload types into a single comprehensive payload type for pathway data
	 *
	 * @template K - The keys of the Pathways type representing different fields
	 * @template V - The payload type associated with each field in the Pathways type
	 *
	 * @returns An object mapping each key in Pathways to its corresponding payload type
	 *
	 * @example
	 * ```ts
	 * const payload: PathwaysPayload = {
	 *   officialName: { field: 'officialName', payload: 'New Official Name' },
	 *   isRenewable: { field: 'isRenewable', payload: true },
	 *   costUom: { field: 'costUom', payload: { abbr: 'USD', currencySymbol: '$' } },
	 *   // ... other fields
	 * }
	 * ```
	 *
	 */
	type PathwaysPayload = {
		[K in PathwaysStringKeys]: PathwaysStringPayload[K]
	} & {
		[K in PathwaysBooleanKeys]: PathwaysBooleanPayload[K]
	} & {
		[K in PathwaysCostUOMKeys]: PathwaysCostUOMPayload[K]
	} & {
		[K in PathwaysDurationKeys]: PathwaysDurationPayload[K]
	} & {
		[K in PathwaysMinMaxKeys]: PathwaysMinMaxPayload[K]
	} & {
		[K in PathwaysArrayKeys]: PathwayNotesPayload[K]
	}

	/**
	 * Combines all possible keys from the Pathways type into a single union type
	 *
	 * @template K - The keys of the Pathways type representing different fields
	 *
	 * @returns A union type of all keys in the Pathways type
	 *
	 * @example
	 * ```ts
	 * const key: PathwaysKeys = 'officialName' // valid
	 * const key2: PathwaysKeys = 'isRenewable' // valid
	 * const key3: PathwaysKeys = 'nonExistentKey' // Error: Type '"nonExistentKey"' is not assignable to type 'PathwaysKeys'
	 * ```
	 *
	 */
	type PathwaysKeys = keyof Pathways
		& (
			| PathwaysArrayKeys
			| PathwaysStringKeys
			| PathwaysBooleanKeys
			| PathwaysCostUOMKeys
			| PathwaysDurationKeys
			| PathwaysMinMaxKeys
		)

	/**
	 * Extends PathwaysKeys to include additional database-related keys
	 *
	 * @template K - The keys of the Pathways type representing different fields
	 *
	 * @returns A union type of all keys in the Pathways type plus 'db' and 'countriesWithPathways'
	 */
	type PathwaysWithDBKeys = PathwaysKeys | 'db' | 'countriesWithPathways'

	/**
	 * Defines the complete structure of a pathway data object
	 *
	 * @returns An object mapping each key in Pathways to its corresponding field type
	 * @see `PATHWAY_BASE` in `constants.ts` for default values
	 */
	type Pathways = Record<PathwaysStringKeys, PathwaysStringField>
		& Record<PathwaysBooleanKeys, PathwaysBooleanField>
		& Record<PathwaysCostUOMKeys, PathwaysCostUOMField>
		& Record<PathwaysDurationKeys, PathwaysDurationField>
		& Record<PathwaysMinMaxKeys, PathwaysMinMaxField>
		& Record<'notes', PathwaysNoteField>
		& Record<'documents', PathwaysDocumentsField>
		& Record<'requirements', PathwaysRequirementsField>
		& Record<'renewableNotes', PathwaysRenewableNotesField>
		& Record<'limitations', PathwaysLimitationsField>
		& Record<'restrictedNationalities', PathwaysRestrictedNationalitiesField>

	/**
	 * Extends the Pathways type to include database-related properties
	 *
	 * @returns An object that includes all properties of Pathways along with 'db' and 'countriesWithPathways'
	 */
	type PathwaysWithDB = Pathways & {
		db: DB
		countriesWithPathways: ReturnType<DB['getCountriesWithPathways']>
	}
	// #endregion ?

	/**
	 * Props for elements that interact with pathway data and dispatch actions. Used in form components as a quick way to type props.
	 *
	 * @property pathwayData - The current state of the pathway data
	 * @property dispatchAction - Function to dispatch actions to update the pathway data
	 *
	 */
	type ElProps = {
		dispatchAction: ActionDispatch<[action: PathwaysActions[keyof PathwaysActions]]>
		pathwayData: PathwaysWithDB
	}
}

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
// #endregion ?
