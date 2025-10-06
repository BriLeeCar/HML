import { z } from "zod";

// #region ? USER AUTH SCHEMAS
const zPassword = z.string().min(6, "Password must be at least 6 characters");
const zUsername = z.string().min(3, "Name must be at least 3 characters");
const zKey = z.string().min(10, "Key must be at least 10 characters");

export const zSignUp = z.object({
	username: zUsername,
	password: zPassword,
	key: zKey,
});

export const zSignIn = zSignUp.pick({
	username: true,
	password: true,
});

export type tSignUp = z.infer<typeof zSignUp>;
export type tSignIn = z.infer<typeof zSignIn>;
// #endregion ?

// #region ? TAG SCHEMAS
export const zTag = z.object({
	id: z.number().or(z.string()),
	name: z.string().min(1, "Tag name is required"),
	parentId: z.number().or(z.string()).optional(),
	color: z.string(),
});

export const zTagWithParent = zTag.extend({
	parent: zTag.optional(),
});

export const zTagWithChildren = zTag.extend({
	children: zTag.array().optional(),
});

export type tTag = z.infer<typeof zTag>;
export type tTagWithParent = z.infer<typeof zTagWithParent>;
export type tTagWithChildren = z.infer<typeof zTagWithChildren>;
export type tTagWithRelations = tTagWithParent & { children: tTag[] };

// #endregion ?

export const UserDBSchema = z.object({
	id: z.number(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
	email: z.email(),
	image: z.string().nullable(),
	emailVerified: z.date().nullable(),
	hashedPassword: z.string().nullable(),
});

export const zBlogPostDBSchema = z.object({
	id: z.number().or(z.string().transform((v) => Number(v))),
	name: z.string(),
	subtitle: z.string(),
	slug: z.string().transform((v) => v.toLowerCase().replace(/\s+/g, "-")),
	createdAt: z.date().or(z.string().transform((v) => new Date(v))),
	updatedAt: z.date().or(z.string().transform((v) => new Date(v))),
	authorId: z.string(),
	image: z.boolean(),
	contentText: z.string(),
	contentHTML: z.string(),
	status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});
