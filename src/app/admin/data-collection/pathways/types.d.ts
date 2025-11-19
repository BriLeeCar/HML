import { ActionDispatch } from 'react'
import { DB } from '~/server/db/db'
import { type initState } from './reducer'

declare global {
	declare namespace YO {
		type test = string
	}
}

// #region ? CASING TYPES
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

declare global {
	type ElProps = {
		dispatchAction: ActionDispatch<[action: Dispatch.Fn]>
		pathwayData: State.Base.WithUtilities
	}
	type TitleCase<T extends string> = Capitalize<ToTitleCase<T>>

	declare namespace State {
		/**
		 *
		 * # StateBase
		 *
		 * > **NOTE**
		 * > - All properties, and most subproperties include an `error: string[]` array for validation error messages.
		 * > - If properties include an array object, they also include a `counter: number` for client-side indexing.
		 * > - Detail values are wrapped in a `value` property, which is what is described below
		 * > - See each property for specific types and structures.
		 *
		 * ## Fields
		 * - **countryId**: - Country Code (ex: USA)
		 * - **pathwayId**: Unique Pathway Identifier
		 * - **officialName**: Official Name of the Pathway
		 * - **officialLink**: URL to Official Source
		 * - **category**: Category of the Pathway
		 * - **description**: Short Description
		 * - **costUom**: Currency unit metadata for costs. Contains an abbreviation (abbr) and a currencySymbol to display prices correctly.
		 * - **duration**: Duration of the pathway (How long is it valid for?)
		 * - **processingTime**: Average processing time
		 * - **cost**: Min/Max costs of the application process
		 * 	- *Note*: Does not include document costs, which are handled separately.
		 * - **documents**: Array of documents required, and their applicable costs.
		 * - **renewable**: Whether the pathway is renewable, along with duration and notes.
		 * - **reunification**: Whether family reunification is possible, along with notes.
		 * - **citizenship**: Whether this pathway can lead to citizenship, along with notes.
		 * - **residency**: Whether this pathway can lead to permanent or long-term residency, along with notes.
		 * - **requirements**: General requirements
		 * - **limitations**: Known limitations, restrictions, or caveats
		 * - **notes**: Additional editorial or administrative notes
		 * - **nationalities**: If any nationality restrictions apply, along with notes and affected nationalities.
		 *
		 *
		 * ## Base Types
		 *
		 * - `StateBaseProp<T, C extends boolean = false>`
		 * 	- `T` the type of the `value` property within each field.
		 * 	- `C` whether the field includes a `counter` property for array indexing.
		 * 	- Generic type wrapper for all StateBase properties.
		 *
		 * ## General Description
		 *
		 * @desc Represents the editable, serializable state for a single immigration/migration pathway entry used in the admin data-collection UI. Each field is wrapped in a StateBaseProp to ensure consistent structuring and base validation properties.
		 *
		 * @example
		 * ```typescript
		 * {
		 * 	// Country ID Field
		 * 	countryId: { value: 'country_123',error: [] },
		 *
		 * 	// Duration Field
		 * 	duration: {
		 * 		value: {
		 * 			min: { value: 6, error: [] },
		 * 			max: { value: 12, error: [] },
		 * 			uom: {
		 * 				value: {
		 * 					base: 'months',value: 30,label: 'Months'
		 * 				},
		 * 				error: []
		 * 			}
		 * 		},
		 * 		error: []
		 * 	},
		 * }
		 * ```
		 */

		type Base = ReturnType<typeof initState>
		// & {
		// 	countryId: {
		// 		value: string | null
		// 		error: string[]
		// 	}
		// 	pathwayId: {
		// 		value: string | null
		// 		error: string[]
		// 	}
		// 	officialName: {
		// 		value: string | null
		// 		error: string[]
		// 	}
		// 	officialLink: {
		// 		value: string | null
		// 		error: string[]
		// 	}
		// 	category: {
		// 		value: string | null
		// 		error: string[]
		// 	}
		// 	description: {
		// 		value: string | null
		// 		error: string[]
		// 	}
		// 	costUom: {
		// 		value: {
		// 			abbr: string
		// 			currencySymbol: string
		// 		}
		// 		error: string[]
		// 	}
		// 	duration: {
		// 		value: {
		// 			min: {
		// 				value: number
		// 				error: string[]
		// 			}
		// 			max: {
		// 				value: number
		// 				error: string[]
		// 			}
		// 			uom: {
		// 				value: {
		// 					base: string | null
		// 					value: number
		// 					label: string
		// 				}
		// 				error: string[]
		// 			}
		// 		}
		// 		error: string[]
		// 	}
		// 	processingTime: {
		// 		value: {
		// 			min: {
		// 				value: number
		// 				error: string[]
		// 			}
		// 			max: {
		// 				value: number
		// 				error: string[]
		// 			}
		// 			uom: {
		// 				value: {
		// 					base: string | null
		// 					value: number
		// 					label: string
		// 				}
		// 				error: string[]
		// 			}
		// 		}
		// 		error: string[]
		// 	}
		// 	cost: {
		// 		value: {
		// 			min: {
		// 				value: number
		// 				error: string[]
		// 			}
		// 			max: {
		// 				value: number
		// 				error: string[]
		// 			}
		// 		}
		// 		error: string[]
		// 	}
		// 	documents: {
		// 		value: {
		// 			title: string | null
		// 			cost: number
		// 			counter: number
		// 			error: string[]
		// 		}[]
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	renewable: {
		// 		value: {
		// 			renewable: boolean
		// 			sameAsInitialDuration: boolean
		// 			duration: {
		// 				min: {
		// 					value: number
		// 					error: string[]
		// 				}
		// 				max: {
		// 					value: number
		// 					error: string[]
		// 				}
		// 				uom: {
		// 					value: {
		// 						base: string | null
		// 						value: number
		// 						label: string
		// 					}
		// 					error: string[]
		// 				}
		// 			}
		// 			notes: {
		// 				value: string
		// 				error: string[]
		// 				counter: number
		// 			}[]
		// 		}
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	reunification: {
		// 		value: {
		// 			possible: boolean
		// 			notes: {
		// 				value: string
		// 				counter: number
		// 			}[]
		// 		}
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	citizenship: {
		// 		value: {
		// 			possible: boolean
		// 			notes: {
		// 				value: string
		// 				counter: number
		// 			}[]
		// 		}
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	residency: {
		// 		value: {
		// 			possible: boolean
		// 			notes: {
		// 				value: string
		// 				counter: number
		// 			}[]
		// 		}
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	requirements: {
		// 		value: {
		// 			value: string
		// 			counter: number
		// 		}[]
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	limitations: {
		// 		value: {
		// 			value: string
		// 			counter: number
		// 		}[]
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	notes: {
		// 		value: {
		// 			value: string
		// 			counter: number
		// 		}[]
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	nationalities: {
		// 		value: {
		// 			restricted: boolean
		// 			notes: {
		// 				value: string
		// 				counter: number
		// 			}[]
		// 			nationalities: {
		// 				value: string
		// 				counter: number
		// 			}[]
		// 		}
		// 		counter: number
		// 		error: string[]
		// 	}
		// 	discordHandle: {
		// 		value: string
		// 		error: string[]
		// 	}
		// }

		namespace Base {
			type Keys = keyof State.Base
			type WithUtilities = State.Base & State.Base.Utility['Props']

			type Utility = {
				Props: {
					db: DB
					countriesWithPathways: ReturnType<DB['getCountriesWithPathways']>
				}
				keys: 'db' | 'countriesWithPathways'
			}
		}
	}
}

declare global {
	declare namespace Validator {
		namespace Fields {
			type UOM =
				| State.Base['duration']
				| State.Base['processingTime']
				| State.Base['renewable']['value']['duration']
			type MinMax = {
				[P in keyof State.Base]: State.Base[P] extends (
					{
						value: {
							min: {
								value: number
								error: string[]
							}
						}
					}
				) ?
					P
				:	never
			}
			type Cost = State.Base['cost']
		}
		namespace Keys {
			type UOM = 'duration' | 'processingTime' | 'renewable'
			type MinMax = Validator.Fields.MinMax[keyof Validator.Fields.MinMax]
		}
	}
	declare namespace Dispatch {
		type Base = State.Base

		type ListKeys = Extract<keyof Base, 'notes' | 'requirements' | 'limitations' | 'documents'>

		type StringKeys = Exclude<
			{
				[P in keyof SetterFn]: SetterFn[P]['payload'] extends { value: string | null } ? P : never
			}[keyof SetterFn],
			'discordHandle'
		>
		type StringFields = {
			[P in Dispatch.StringKeys]: SetterFn[P]
		}

		type SetterFn = {
			[P in keyof Base]-?: {
				type: `set${Capitalize<string & P>}`
				field: P
				payload: Base[P]
			}
		}

		type UpdateAddDeleteFn = {
			[P in ListKeys]-?:
				| {
						type: `update${Capitalize<string & P>}`
						field: P
						payload: {
							counter: number
							value: number | unknown | string
						}
				  }
				| {
						type: `add${Capitalize<string & P>}`
						field: P
						payload: null
				  }
				| {
						type: `delete${Capitalize<string & P>}`
						field: P
						payload: number
				  }
		}

		type Fn =
			| UpdateAddDeleteFn[keyof UpdateAddDeleteFn]
			| SetterFn[keyof SetterFn]
			| {
					type: 'checkRenewable'
					field: 'renewable'
					payload: boolean
			  }
			| {
					type: 'checkRenewableSameAsInitialDuration'
					field: 'renewable'
					payload: boolean
			  }
			| {
					type: 'deleteRenewableNote'
					field: 'renewable'
					payload: number
			  }
			| {
					type: 'deleteNationality'
					field: 'nationalities'
					payload: number
			  }
			| {
					type: 'deleteRestriction'
					field: 'restrictions'
					payload: number
			  }
			| {
					type: 'deleteNote'
					field: 'notes'
					payload: number
			  }
			| {
					type: 'deleteDocument'
					field: 'documents'
					payload: number
			  }
	}
}
