import z from 'zod'
import type { appRouter } from './root'

// #region ? SCHEMA PRIMITIVES
const UserId = z.cuid()
const UserName = z.string().min(2).max(32)
const Id = z.coerce.number()
const DateNow = z.date().default(new Date())
const Name = z.string().min(1, 'Name is required')

export const enumContentStatus = z.enum({
	DRAFT: 'DRAFT',
	PUBLISHED: 'PUBLISHED',
	ARCHIVED: 'ARCHIVED',
})
// #endregion ?

// #region ? SCHEMAS

const schemaPost = z.object({
	id: Id,
	name: z.string({
		error: 'Every post must have a title',
	}),
	createdAt: DateNow,
	updatedAt: DateNow,
	authorId: UserId,
	contentHTML: z.string(),
	contentText: z.string(),
	contentDelta: z.string().default('{}'),
	status: enumContentStatus.default('DRAFT'),
	subtitle: z.string().nullable(),
	slug: z.string({
		error: 'Every post needs a slug',
	}),
	image: z.boolean().default(false),
	imageKey: z.string().nullable(),
	imageExt: z.string().nullable(),
	metaDescription: z.string().nullable(),
	metaKeywords: z.array(z.string()).optional(),
})

const schemaTag = z.object({
	id: Id,
	name: z.string({
		error: 'A name is required for a tag',
	}),
	parentId: Id.nullable(),
	color: z.string().default('grey'),
})

const schemaPostTag = z.object({
	postId: Id,
	tagId: Id,
})

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

const schemaUserSocial = z.object({
	userId: UserId,
	handle: z.string({
		error: 'A handle is required to add a social link',
	}),
	socialCode: z.string({
		error:
			'A social code is required. This is the camalCase version of the social platform name. IE tikTok or blueSky',
	}),
})

const schemaSocial = z.object({
	codeName: z.string({
		error:
			'A code name is required. Use camalCase with no spaces. IE tikTok or blueSky',
	}),
	name: Name,
	url: z.string(),
	icon: z.string(),
	lightModeColor: z.string().startsWith('#'),
	darkModeColor: z.string().startsWith('#'),
	profileLinkFormat: z.string().includes('[HANDLE]'),
	profileEntryFormat: z.string().includes('[HANDLE]'),
})

const schemaPostVersionHistory = z.object({
	id: Id,
	postId: Id,
	userId: UserId,
	action: z.enum(['CREATED', 'UPDATED', 'PUBLISHED', 'UNPUBLISHED']),
	instanceAt: DateNow,
})

const schemaPostRelations = z.object({
	author: schemaUser,
	tags: z.array(schemaPostTag),
	postVersionHistories: z.array(schemaPostVersionHistory),
})

const schemaPostTagRelations = z.object({
	post: schemaPost,
	tag: schemaTag,
})

const schemaTagRelations = z.object({
	posts: z.array(schemaPostTag),
	parent: schemaTag.nullable(),
	children: z.array(schemaTag),
})

const schemaUserRelations = z.object({
	posts: z.array(schemaPost),
	postVersionHistories: z.array(schemaPostVersionHistory),
	key: schemaUserKey.nullable(),
	socials: z.array(schemaUserSocial),
})

const schemaUserKeyRelations = z.object({
	user: schemaUser.nullable(),
})

const schemaUserSocialRelations = z.object({
	user: schemaUser,
	social: schemaSocial,
})

const schemaSocialRelations = z.object({
	users: z.array(schemaUserSocial),
})

const schemaPostVersionHistoryRelations =
	schemaPostVersionHistory.extend({
		post: schemaPost,
		user: schemaUser,
	})

export const prismaSchema = {
	Post: {
		base: schemaPost,
		relations: schemaPostRelations,
	},
	PostTag: {
		base: schemaPostTag,
		relations: schemaPostTagRelations,
	},
	Tag: {
		base: schemaTag,
		relations: schemaTagRelations,
	},
	User: {
		base: schemaUser,
		relations: schemaUserRelations,
	},
	UserKey: {
		base: schemaUserKey,
		relations: schemaUserKeyRelations,
	},
	UserSocial: {
		base: schemaUserSocial,
		relations: schemaUserSocialRelations,
	},
	Social: {
		base: schemaSocial,
		relations: schemaSocialRelations,
	},
	PostVersionHistory: {
		base: schemaPostVersionHistory,
		relations: schemaPostVersionHistoryRelations,
	},
}

export {
	schemaPost as Post,
	schemaPostTag as PostTag,
	schemaPostVersionHistory as PostVersionHistory,
	schemaSocial as Social,
	schemaTag as Tag,
	schemaUser as User,
	schemaUserKey as UserKey,
	schemaUserSocial as UserSocial,
}
// #endregion ?

// #region ? TYPES
export type zPost = z.infer<typeof schemaPost>
export type zPostTag = z.infer<typeof schemaPostTag>
export type zTag = z.infer<typeof schemaTag>
export type zUser = z.infer<typeof schemaUser>
export type zUserKey = z.infer<typeof schemaUserKey>
export type zUserSocial = z.infer<typeof schemaUserSocial>
export type zSocial = z.infer<typeof schemaSocial>
export type zPostVersionHistory = z.infer<
	typeof schemaPostVersionHistory
>

export type zPostRelations = z.infer<typeof schemaPostRelations>
export type zPostTagRelations = z.infer<typeof schemaPostTagRelations>
export type zTagRelations = z.infer<typeof schemaTagRelations>
export type zUserRelations = z.infer<typeof schemaUserRelations>
export type zUserKeyRelations = z.infer<typeof schemaUserKeyRelations>
export type zUserSocialRelations = z.infer<
	typeof schemaUserSocialRelations
>
export type zSocialRelations = z.infer<typeof schemaSocialRelations>
export type zPostVersionHistoryRelations = z.infer<
	typeof schemaPostVersionHistoryRelations
>

type ModelName = keyof typeof prismaSchema
type ModelType = keyof (typeof prismaSchema)[ModelName]

// #endregion ?

// #region ? HELPERS
// #region ! ---------- MODEL ----------
export type ModelWithRelations<M extends ModelName> = z.infer<
	(typeof prismaSchema)[M]['relations']
>

export type ModelBase<M extends ModelName> = z.infer<
	(typeof prismaSchema)[M]['base']
>

export type Model<M extends ModelName, T extends ModelType = 'base'> =
	T extends 'base' ? ModelBase<M>
	: T extends 'relations' ? ModelWithRelations<M>
	: never
// #endregion ! --------------------

// #region ! ---------- ROUTER ----------
type RouterName = keyof (typeof appRouter)['_def']['record']
type RouterProcedureBase<R extends RouterName> =
	keyof (typeof appRouter)['_def']['record'][R]

export type RouterInput<
	R extends RouterName,
	P extends RouterProcedureBase<R>,
> = (typeof appRouter)['_def']['record'][R][P]['_def']['$types']['input']

export type RouterOutput<
	R extends RouterName,
	P extends RouterProcedureBase<R>,
> = NonNullable<
	(typeof appRouter)['_def']['record'][R][P]['_def']['$types']['output']
>

export type RouterDetail<
	R extends RouterName,
	P extends RouterProcedureBase<R>,
	S extends 'input' | 'output',
> = S extends 'input' ? RouterInput<R, P> : RouterOutput<R, P>

export type AllSchemas<R extends RouterName> = {
	[P in RouterProcedureBase<R>]: {
		input: RouterInput<R, P>
		output: RouterOutput<R, P>
	}
}

export type RouterProcedureDetails<
	R extends RouterName,
	P extends RouterProcedureBase<R>,
> = {
	input: RouterInput<R, P>
	output: RouterOutput<R, P>
}
// #endregion ! --------------------
// #endregion ?
