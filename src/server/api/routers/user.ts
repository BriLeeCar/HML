import { z } from 'zod'
import { zProfileSchema, zUserDBSchema } from '~/lib/zod'
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '~/server/api/trpc'
import { Social, User, UserKey } from '~/zod'

export const userRouter = createTRPCRouter({
	getById: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			return await ctx.db.user.findUnique({
				where: { id: input },
			})
		}),

	getByIdForProfile: publicProcedure
		.input(User.shape.id)
		.query(async ({ ctx, input }) => {
			const user = await ctx.db.user.findUnique({
				where: { id: input },
				include: {
					socials: {
						select: {
							handle: true,
							social: true,
						},
					},
				},
			})
			if (!user) return null
			return zUserDBSchema
				.extend({
					socials: z.array(
						z
							.object({
								handle: z.string(),
								social: Social,
							})
							.transform((social) => {
								return {
									handle: social.handle,
									...social.social,
								}
							})
					),
				})
				.parse(user)
		}),

	checkForUserKey: publicProcedure
		.input(z.object({ userKey: z.string() }))
		.query(async ({ input, ctx }) => {
			const key = await ctx.db.userKey.findUnique({
				where: { key: input.userKey },
				include: { user: true },
			})

			if (key) {
				return {
					valid: true,
					user:
						key.user ?
							{ id: key.user.id, name: key.user.name }
						:	null,
				}
			}
		}),
	createNewFromKey: publicProcedure
		.input(
			UserKey.extend({
				secret: User.shape.secret,
			})
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.db.user.create({
				data: {
					name: input.name,
					secret: input.secret,
					key: {
						connect: {
							key: input.key,
						},
					},
				},
			})
		}),
	getAll: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.user.findMany()
	}),
	updateUserProfile: protectedProcedure
		.input(
			z.object({
				...zProfileSchema.shape,
				socials: z.array(
					z.object({
						handle: z.string(),
						...Social.shape,
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id, socials, ...rest } = input

			const socialPlatforms = await ctx.db.social.findMany({
				where: { name: { in: socials.map((s) => s.name) } },
			})

			return await ctx.db.user.update({
				where: { id: id },
				data: {
					...rest,

					socials: {
						deleteMany: {
							NOT: {
								socialCode: { in: socials.map((s) => s.codeName) },
							},
						},
						createMany: {
							skipDuplicates: true,
							data: socials.map((s) => {
								return {
									socialCode:
										socialPlatforms.find((sp) => sp.name == s.name)
											?.codeName ?? '',
									handle: s.handle,
								}
							}),
						},
						updateMany: socials.map((s) => {
							return {
								where: {
									userId: id,
									socialCode: s.codeName,
								},
								data: {
									handle: s.handle,
								},
							}
						}),
					},
				},
			})
		}),
})
