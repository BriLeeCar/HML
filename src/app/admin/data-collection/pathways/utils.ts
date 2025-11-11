import { type Dispatch, type SetStateAction } from 'react'
import z from 'zod/v4'
import { costStateInit } from './Currency'
import { durationStateInit } from './Duration'
import { tPathwayForm, zPathway } from './schema'
import { simpleStateInit } from './SimpleInput'

export type tPathway = z.infer<typeof zPathway>
export type tPathwayKeys = keyof tPathway

export type tPathwaySimpleKeys = Exclude<
	tPathwayKeys,
	tPathwayComplexKeys
>

export type tPathwayRangeKeys =
	| 'visaDuration'
	| 'applicationCost'
	| 'processingTime'

export type tPathwayComplexKeys = Exclude<
	tPathwayKeys,
	| 'countryId'
	| 'pathwayId'
	| 'shortName'
	| 'officialName'
	| 'link'
	| 'category'
	| 'description'
>

export const validate = (
	schemaKey: tPathwayKeys,
	value: tPathway[typeof schemaKey] | undefined,
	setPathway: Dispatch<SetStateAction<tPathwayForm>>,
	customError?: string
) => {
	const shape = zPathway.shape[schemaKey]
	const parsed = shape.safeParse(value)

	if (value == undefined || value == null || value === '') {
		setPathway((prev) => ({
			...prev,
			[schemaKey]: {
				value: null,
				error: null,
			},
		}))
	} else if (customError) {
		setPathway((prev) => ({
			...prev,
			[schemaKey]: {
				value: null,
				error: customError,
			},
		}))
		return
	} else if (parsed.success) {
		setPathway((prev) => ({
			...prev,
			[schemaKey]: { value: parsed.data, error: null },
		}))
	} else {
		setPathway((prev) => ({
			...prev,
			[schemaKey]: {
				value: null,
				error: parsed.error.issues[0].message,
			},
		}))
	}
}

export type tValdationParams = Parameters<typeof validate>
export type tValidationFn = typeof validate

export const initFormValues = {
	countryId: { value: null, error: null }, // ! DONE
	...simpleStateInit,
	...durationStateInit,
	...costStateInit,

	potentialResidencyPathway: {
		value: false,
		error: null,
	},
	residencyNotes: { value: [], error: null },

	potentialCitizenshipPathway: {
		value: false,
		error: null,
	},
	citizenshipNotes: { value: [], error: null },

	reunificationIsPossible: { value: false, error: null },
	reunificationNotes: { value: [], error: null },

	requiredDocuments: {
		value: [],
		error: null,
	},

	hasRestrictions: { value: false, error: null },
	nationalities: { value: [], error: null },
	restrictionNotes: { value: [], error: null },

	requirements: { value: [], error: null },
	limitations: { value: [], error: null },
	notes: {
		value: [],
		error: null,
	},
}
