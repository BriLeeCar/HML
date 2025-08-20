import z, { ZodPipe, ZodString, ZodTransform } from 'zod/v4'
import { toTitleCase } from './text'

export const zContinents = z.enum([
	'africa',
	'antarctica',
	'asia',
	'europe',
	'north america',
	'oceania',
	'south america',
])

export const zPre = {
	toTitleCase: z.preprocess((val) => {
		if (typeof val == 'string') {
			return toTitleCase(val)
		}
		return val
	}, z.string()),
	toLowerCase: z.preprocess((val) => {
		if (typeof val == 'string') {
			return val.toLowerCase()
		}
		return val
	}, z.string()),
}

export const zTransform: {
	toUpperCase: ZodPipe<ZodString, ZodTransform<string, string>>
	toNumber: ZodPipe<ZodString, ZodTransform<number, string>>
	toTitleCase: ZodPipe<ZodString, ZodTransform<string, string>>
} = {
	toUpperCase: z.string().transform((val) => val.toUpperCase()),
	toNumber: z.string().transform((val) => Number(val)),
	toTitleCase: z
		.string()
		.transform((val) => toTitleCase(val) as string),
}
