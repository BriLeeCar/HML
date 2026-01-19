import z, { ZodNullable, ZodNumber, ZodString } from 'zod'
import { toTitleCase } from '~/lib/text'
import { createTRPCRouter, publicProcedure } from '../trpc'

const removeKey = (record: ZodNullable | ZodNumber) => record.transform(() => undefined)
const removeNullKeys = (val: ZodString) =>
	val.nullable().transform(val => (val == null ? undefined : val))

const parseResource = z
	.object({
		authorId: removeKey(z.string().nullable()),
		typeId: removeKey(z.number()),
		areaId: removeKey(z.number()),
		href: z.object({
			url: z.string(),
			target: z
				.string()
				.default('_self')
				.transform(val => (val == '' ? '_self' : val)),
		}),
		title: z.string(),
		subtitle: z.string().optional(),
		type: z.object({
			id: removeKey(z.number()),
			type: z.string(),
			icon: removeNullKeys(z.string()),
			color: removeNullKeys(z.string()),
		}),
		icon: z.string().optional(),
		author: z
			.object({
				firstName: z.string(),
				lastName: z.string(),
			})
			.nullable()
			.transform(val => (val ? `${val.firstName} ${val.lastName}` : null)),
		authorString: removeNullKeys(z.string()),
		date: z.custom(() => true).transform(val => new Date(val as string).toDateString()),
		area: z.object({
			id: removeKey(z.number()),
			area: z.string(),
			tagline: removeNullKeys(z.string()),
		}),
	})
	.transform(r => ({
		...r,
		author: r.author || r.authorString || undefined,
		authorString: undefined,
		type: r.type.type,
		icon: {
			name: r.icon || r.type.icon || 'InfoCircleIcon',
			color: r.type.color || 'current',
		},
		area: toTitleCase(r.area.area) as string,
		tagline: r.area.tagline || undefined,
	}))

export const ContentResources = createTRPCRouter({
	getAllResources: publicProcedure.query(async ({ ctx }) => {
		const resources = await ctx.db.contentResource.findMany({
			where: {
				area: {
					area: {
						notIn: ['official statements', 'campaigns'],
					},
				},
			},
		})
		return resources
	}),
	getMediaResources: publicProcedure.query(async ({ ctx }) => {
		const resources = await ctx.db.contentResource.findMany({
			where: {
				areaId: {
					lte: 2,
				},
			},
			include: {
				area: true,
				author: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
				type: true,
			},
		})
		type ResourceParse = z.infer<typeof parseResource>
		return resources.map(resource => {
			const safeParse = parseResource.safeParse(resource)
			if (!safeParse.success) {
				console.log(JSON.parse(safeParse.error.message))
				return {}
			} else {
				return safeParse.data
			}
		}) as ResourceParse[]
	}),
})
