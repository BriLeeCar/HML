import { z } from 'zod'

// #region ? USER AUTH SCHEMAS
const zPassword = z
	.string()
	.min(6, 'Password must be at least 6 characters')
const zUsername = z
	.string()
	.min(3, 'Name must be at least 3 characters')
const zKey = z.string().min(10, 'Key must be at least 10 characters')

export const zSignUp = z.object({
	username: zUsername,
	password: zPassword,
	key: zKey,
})

export const zSignIn = zSignUp.pick({
	username: true,
	password: true,
})

export type tSignUp = z.infer<typeof zSignUp>
export type tSignIn = z.infer<typeof zSignIn>
// #endregion ?

// #region ? TAG SCHEMAS
export const zTag = z.object({
	id: z.number().or(z.string()),
	name: z.string().min(1, 'Tag name is required'),
	parentId: z.number().or(z.string()).nullable(),
	color: z.string(),
})

export const zTagWithParent = zTag.extend({
	parent: zTag.optional(),
})

export const zTagWithChildren = zTag.extend({
	children: zTag.array().optional(),
})

export type tTag = z.infer<typeof zTag>
export type tTagWithParent = z.infer<typeof zTagWithParent>
export type tTagWithChildren = z.infer<typeof zTagWithChildren>
export type tTagWithRelations = tTagWithParent & { children: tTag[] }

// #endregion ?

export const zUserDBSchema = z.object({
	id: z.string(),
	fullName: z.string().optional().default(''),
	name: z.string().nullable().default(null),
	email: z.email().or(z.string()).nullable().default(null),
	emailVerified: z.date().nullable().default(null),
	image: z.string().nullable(),
	secret: z.string(),
	firstName: z.string(),
	lastName: z.string(),
})

const zId = z.coerce.number()

export const zBlogPostDBSchema = z.object({
	id: zId.default(0),
	name: z.string().default(''),
	createdAt: z.coerce.date().default(new Date()),
	updatedAt: z.coerce.date().default(new Date()),
	contentHTML: z.string().default(''),
	contentText: z.string().default(''),
	status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
	subtitle: z.string().default(''),
	slug: z
		.string()
		.transform((v) => v.toLowerCase().replace(/\s+/g, '-'))
		.default(''),
	image: z.boolean().default(false),
})

export const zBlogPostEditSchema = zBlogPostDBSchema
	.extend({
		author: zUserDBSchema.pick({
			id: true,
			fullName: true,
			firstName: true,
			lastName: true,
			name: true,
		}),
		tags: z
			.array(
				z.object({
					tag: zTag,
				})
			)
			.optional()
			.default([]),
	})
	.pipe(
		z.transform((post) => {
			return {
				...post,
				type: 'edit',
				tags: post.tags?.map(({ tag }) => tag) ?? [],
			}
		})
	)

export const zBlogPostAddSchema = zBlogPostDBSchema
	.extend({
		author: zUserDBSchema,
	})
	.pipe(
		z.transform((post) => ({
			...post,
			id: 0,
			type: 'add',
			tags: [] as tTag[],
		}))
	)
