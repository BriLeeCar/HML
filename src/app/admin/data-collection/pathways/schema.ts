import { z } from 'zod/v4'
import { errors } from '../validation'
import { zCostRange } from './Currency'
import {
	zDuration,
	zDurationProcess,
	zDurationRange,
	zDurationUOM,
} from './Duration'
import { zNoteArray } from './List'

/**
 * Boolean Schema with default false
 */
const zBooleanF = z.boolean().prefault(false)

/**
 * 3-letter country code (ISO 3166-1 alpha-3) Schema
 */

export const zCountryCode = z
	.string()
	.length(3, errors.strExact(3))
	.toUpperCase()

// #region ! ---------- PATHWAY SCHEMA ----------
const schema = {
	countryId: zCountryCode,
	pathwayId: z
		.string()
		.trim()
		.toLowerCase()
		.transform((val) => {
			return val.replace(/\s+/g, '-')
		}),
	shortName: z
		.string()
		.trim()
		.min(3, errors.strMin(3))
		.max(30, errors.strMax(30)),
	officialName: z
		.string()
		.min(3, errors.strMin(3))
		.max(200, errors.strMax(200)),
	link: z.url(),
	category: z.string(),
	description: z.string().max(1000),
	visaDuration: {
		min: zDuration,
		max: zDuration.optional(),
		uom: zDurationUOM,
	},
	isRenewable: zBooleanF,
	renewalDuration: {
		min: zDuration,
		max: zDuration.optional(),
		uom: zDurationUOM,
	},
	potentialResidencyPathway: zBooleanF,
	residencyNotes: zNoteArray,
	potentialCitizenshipPathway: zBooleanF,
	citizenshipNotes: zNoteArray,
	reunificationIsPossible: zBooleanF,
	reunificationNotes: zNoteArray,
	applicationCost: zCostRange,
	requiredDocuments: z.array(z.string().max(200)).max(50),
	documentCost: zCostRange.optional(),
	processingTime: {
		min: zDuration,
		max: zDuration.optional(),
		uom: zDurationUOM,
	},
	hasRestrictions: zBooleanF,
	nationalities: z.array(z.string().max(3)).max(100).prefault([]),
	restrictionNotes: zNoteArray,
	requirements: zNoteArray,
	limitations: zNoteArray,
	notes: zNoteArray,
}

export const zPathway = z.object({
	countryId: schema.countryId,
	pathwayId: schema.pathwayId,
	shortName: schema.shortName,
	officialName: schema.officialName,
	link: schema.link,
	category: schema.category,
	description: schema.description,
	visaDuration: z.object(schema.visaDuration).pipe(zDurationProcess),

	isRenewable: zBooleanF,
	renewalDuration: zDurationRange.optional(),

	potentialResidencyPathway: zBooleanF,
	residencyNotes: zNoteArray,

	potentialCitizenshipPathway: zBooleanF,
	citizenshipNotes: zNoteArray,

	reunificationIsPossible: zBooleanF,
	reunificationNotes: zNoteArray,

	applicationCost: zCostRange,

	requiredDocuments: z.array(z.string().max(200)).max(50),
	documentCost: zCostRange.optional(),

	processingTime: zDurationRange,

	hasRestrictions: zBooleanF,
	nationalities: z.array(z.string().max(3)).max(100).prefault([]),
	restrictionNotes: zNoteArray,

	requirements: zNoteArray,
	limitations: zNoteArray,
	notes: zNoteArray,
})

export type tEntryField<T> = {
	value: T | null
} & ErrorField

export type tRangeField<
	T extends string | number | null,
	U = string,
> = {
	min: tEntryField<T>
	max: tEntryField<T>
	uom: tEntryField<U>
}

type ErrorField = {
	error: string | null
}

export type tPathwayForm = {
	countryId: tEntryField<AnySafe>
	pathwayId: tEntryField<string>
	shortName: tEntryField<string>
	officialName: tEntryField<string>
	link: tEntryField<string>
	category: tEntryField<string>
	description: tEntryField<string>

	visaDuration: tRangeField<number, { label: string; value: number }>

	isRenewable: tEntryField<boolean>
	renewalDuration: tRangeField<
		number,
		{ label: string; value: number }
	>

	potentialResidencyPathway: tEntryField<boolean>
	residencyNotes: tEntryField<string[]>

	potentialCitizenshipPathway: tEntryField<boolean>
	citizenshipNotes: tEntryField<string[]>

	reunificationIsPossible: tEntryField<boolean>
	reunificationNotes: tEntryField<string[]>

	applicationCost: tRangeField<number, string | null>

	requiredDocuments: tEntryField<string[]>
	documentCost: tRangeField<number, string | null>

	processingTime: tRangeField<
		number,
		{ label: string; value: number }
	>

	hasRestrictions: tEntryField<boolean>
	nationalities: tEntryField<string[]>
	restrictionNotes: tEntryField<string[]>

	requirements: tEntryField<string[]>
	limitations: tEntryField<string[]>
	notes: tEntryField<string[]>
}
