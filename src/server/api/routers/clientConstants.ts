import z, { type ZodType } from 'zod'

export const zMinMax = ({
	specialMessage,
	include,
	required = false,
	wholeNumberOnly = false,
}: {
	min?: string
	max?: string
	specialMessage?: string
	include?: {
		[key: string]: ZodType
	}
	required?: boolean
	wholeNumberOnly?: boolean
}) => {
	return z
		.object(
			{
				min: z.number().prefault(0),
				max: z.number().prefault(0),
				...include,
			},
			required ? 'This field group is required' : undefined
		)
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
						message: 'Must be a non-negative number',
						minimum: 0,
					})
			})
			if (data.max > 0 && data.max < data.min) {
				ctx.addIssue({
					code: 'custom',
					message: specialMessage || 'Maximum must be greater than or equal to Minimum',
				})
			}
		})
		.transform(({ min, max, ...rest }) => {
			return {
				min: Number(min),
				max: Number(max),
				...rest,
			}
		})
}

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
			duration: z.number().prefault(1),
			processTime: z.number().prefault(1),
			renewal: z.number().prefault(1),
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
			processTime: zMinMax({
				include: {
					note: z.string().optional(),
				},
				required: true,
			}),
			cost: zMinMax({ required: true }).nonoptional(),
			duration: zMinMax({
				include: {
					note: z.string().optional(),
				},
				required: true,
			}),
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
						link: z.url().optional(),
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
			notes: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string('Note not provided'),
					})
				)
				.prefault([]),
			limitations: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string('Note not provided'),
					})
				)
				.prefault([]),
			restrictions: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string(),
					})
				)
				.prefault([]),
			requirements: z
				.array(
					z.object({
						counter: z.number(),
						note: z.string(),
					})
				)
				.prefault([]),
			renewal: zMinMax({
				include: {
					note: z.string().optional(),
				},
			}).optional(),
		}),
	})
	.loose()
