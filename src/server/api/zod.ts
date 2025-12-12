import z from 'zod'

// #region ? SCHEMA PRIMITIVES
const UserId = z.cuid()
const UserName = z.string().min(2).max(32)

// #endregion ?

// #region ? SCHEMAS

const schemaUser = z.object({
	id: UserId,
	name: UserName,
	email: z.string().nullable(),
	emailVerified: z.date().nullable(),
	image: z.string().nullable(),
	secret: z.string().min(2).max(64),
	firstName: z.string().nullable(),
	lastName: z.string().nullable(),
})

const schemaUserKey = z.object({
	key: z.string(),
	userId: UserId.nullable(),
	name: UserName,
})

export { schemaUser as User, schemaUserKey as UserKey }
// #endregion ?

// #region ? TYPES
export type tUser = z.infer<typeof schemaUser>
export type tUserKey = z.infer<typeof schemaUserKey>

// #endregion ?

// export const zMinMax = ({
// 	specialMessage,
// 	include,
// 	required = false,
// 	wholeNumberOnly = false,
// }: {
// 	min?: string
// 	max?: string
// 	specialMessage?: string
// 	include?: {
// 		[key: string]: z.ZodType
// 	}
// 	required?: boolean
// 	wholeNumberOnly?: boolean
// }) => {
// 	return z
// 		.object(
// 			{
// 				min: z.number().prefault(0),
// 				max: z.number().prefault(0),
// 				...(include ? { ...include } : {}),
// 			},
// 			required ? 'This field group is required' : undefined
// 		)
// 		.superRefine((data, ctx) => {
// 			Object.keys(data).forEach(key => {
// 				if (key !== 'min' && key !== 'max') {
// 					return
// 				}
// 				const thisField = data[key as 'min' | 'max']

// 				thisField % 1 > 0
// 					&& wholeNumberOnly
// 					&& ctx.addIssue({
// 						code: 'custom',
// 						path: [key],
// 						message: 'Must be a whole number',
// 					})

// 				thisField < 0
// 					&& ctx.addIssue({
// 						code: 'too_small',
// 						path: [key],
// 						origin: 'number',
// 						message: 'Must be a non-negative number',
// 						minimum: 0,
// 					})
// 			})
// 			if (data.max > 0 && data.max < data.min) {
// 				ctx.addIssue({
// 					code: 'custom',
// 					message: specialMessage || 'Maximum must be greater than or equal to Minimum',
// 				})
// 			}
// 		})
// 		.transform(({ min, max, ...rest }) => {
// 			return {
// 				min: Number(min),
// 				max: Number(max),
// 				...rest,
// 			}
// 		})
// }

export const zMinMax = ({
	wholeNumberOnly = false,
}: {
	wholeNumberOnly?: boolean
	required?: boolean
}) =>
	z
		.object({ min: z.number(), max: z.number() })
		.loose()
		.superRefine((data, ctx) => {
			Object.keys(data).forEach(key => {
				if (key !== 'min' && key !== 'max') {
					return
				}
				const thisField = data[key as 'min' | 'max']

				thisField % 1 > 0
					&& wholeNumberOnly
					&& ctx.addIssue({
						code: 'custom',
						path: [key],
						message: 'Must be a whole number',
					})

				thisField < 0
					&& ctx.addIssue({
						code: 'too_small',
						path: [key],
						origin: 'number',
						message: 'No negatives',
						minimum: 0,
					})
			})
			if (data.max > 0 && data.max < data.min) {
				ctx.addIssue({
					code: 'custom',
					message: 'Max must be greater than or equal to Min, or zero',
				})
			}
			if (data.max > 0 && data.min <= 0) {
				ctx.addIssue({
					code: 'custom',
					message: 'Min must be greater than zero if using a Max value',
				})
			}
		})

const zDuration = z.object({
	min: z.number().prefault(0),
	max: z.number().prefault(0),
	separate: z.boolean().prefault(false),
})

export const zCreatePathwayInput = z
	.object({
		counters: z.object({
			notes: z.number(),
			limitations: z.number(),
			requirements: z.number(),
			restrictions: z.number(),
			documents: z.number(),
		}),
		date: z.date(),
		durations: z.object({
			duration: zDuration,
			processTime: zDuration,
			renewal: zDuration,
		}),
		piplines: z.object({
			residency: z.boolean().prefault(false),
			citizenship: z.boolean().prefault(false),
			reunification: z.boolean().prefault(false),
			renewal: z.boolean().prefault(false),
		}),
		query: z.object({
			countryCode: z.string('Country ID is required'),
			name: z.string('Country Name is required'),
			link: z.url('Official link source is required'),
			description: z.string('Pathway description is required'),
			currencyCode: z.string('Currency code is required'),
			processTime: z
				.object({
					min: z.number().prefault(0),
					max: z.number().prefault(0),
					note: z.string().optional(),
				})
				.pipe(zMinMax({ wholeNumberOnly: true })),
			cost: zMinMax({ required: true }).nonoptional(),
			duration: z
				.object({
					min: z.number().prefault(0),
					max: z.number().prefault(0),
					note: z.string().optional(),
				})
				.pipe(zMinMax({ wholeNumberOnly: true })),
			documents: z
				.array(
					z.object({
						id: z.number(),
						documentId: z.number('Document Type Required'),
						title: z
							.string()
							.transform(val => (val == '' ? null : null))
							.nullable(),
						cost: z.number().optional(),
						description: z.string().optional(),
						link: z.any(),
						isRequired: z.boolean().prefault(false),
					})
				)
				.optional(),
			restrictedNationalities: z
				.array(
					z.object({
						countryCode: z.string('Country code required'),
						note: z.string('Note not provided'),
					})
				)
				.prefault([]),
			citizenship: z.string().optional(),
			residency: z.string().optional(),
			reunification: z.string().optional(),
			notes: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string('Note not provided'),
					})
				)
				.optional()
				.prefault([]),
			limitations: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string('Note not provided'),
					})
				)
				.optional()
				.prefault([]),
			restrictions: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string(),
					})
				)
				.optional()
				.prefault([]),
			requirements: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string(),
					})
				)
				.prefault([]),
			renewal: z
				.object({
					min: z.number().prefault(0),
					max: z.number().prefault(0),
					note: z.string().optional(),
				})
				.pipe(zMinMax({ wholeNumberOnly: true }))
				.optional(),
		}),
	})
	.loose()
