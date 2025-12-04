import { z } from 'zod'

// #region ? PRIMITIVES
export const zSocialPlatformSchema = z.object({
	codeName: z.string(),
	name: z.string(),
	url: z.string(),
	icon: z.string().nullable(),
	darkModeColor: z.string(),
	lightModeColor: z.string(),
	profileEntryFormat: z.string().includes('[HANDLE]'),
	profileLinkFormat: z.string().includes('[HANDLE]'),
})

export type tSocialPlatform = z.infer<typeof zSocialPlatformSchema>

// #endregion ?

// #region ? USER AUTH SCHEMAS
const zPassword = z.string().min(6, 'Password must be at least 6 characters')
const zUsername = z.string().min(3, 'Name must be at least 3 characters')
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

// #region ? USER SCHEMAS
export const zUserDBSchema = z.object({
	id: z.string(),
	name: z.string({
		error: 'Name is required',
	}),
	email: z.email().or(z.string()).nullable().default(null),
	emailVerified: z.date().nullable().default(null),
	image: z.string().nullable(),
	secret: z.string({
		error: 'A secret is required',
	}),
	firstName: z.string().nullable().default(null),
	lastName: z.string().nullable().default(null),
})

export const zUserSocialSchema = z.object({
	handle: z.string({
		error: 'A handle is required to add a social link',
	}),
	social: zSocialPlatformSchema,
})

export const zProfileSchema = zUserDBSchema.extend({
	socials: z.array(
		zUserSocialSchema.transform(social => {
			return {
				handle: social.handle,
				...social.social,
			}
		})
	),
})

// #endregion ?

// #region ? BLOG POST SCHEMAS
const zId = z.coerce.number()
export const zBlogPostDBSchema = z.object({
	id: zId.default(0),
	name: z.string({ error: 'Every post must have a title' }).default(''),
	createdAt: z.coerce.date().default(new Date()),
	updatedAt: z.coerce.date().default(new Date()),
	contentHTML: z.string().default(''),
	contentText: z.string().default(''),
	status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
	subtitle: z.string().default(''),
	slug: z
		.string({
			error: 'Every post needs a slug',
		})
		.transform(v => v.toLowerCase().replace(/\s+/g, '-'))
		.default(''),
	image: z.boolean().default(false),
})

export const zBlogPostEditSchema = zBlogPostDBSchema
	.extend({
		author: zUserDBSchema.pick({
			id: true,
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
		z.transform(post => {
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
		z.transform(post => ({
			...post,
			id: 0,
			type: 'add',
			tags: [] as tTag[],
		}))
	)

// #endregion ?
