import z from 'zod'
import { deleteFile } from '~/server/s3'
import { Post, prismaSchema, Tag, User } from '~/zod'
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc'

const zPost = z.object({
	...Post.shape,
	tags: Tag.shape.id.array(),
	author: User.shape.id,
})

export const blogPostRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.post.findMany({
			take: 10,
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				name: true,
				slug: true,
				subtitle: true,
				createdAt: true,
				updatedAt: true,
				status: true,
				tags: {
					select: {
						tag: {
							select: {
								name: true,
							},
						},
					},
				},
				author: true,
			},
		})
	}),
	create: protectedProcedure
		.input(
			z.object({
				author: z.string(),
				name: z.string().min(3).max(100),
				subtitle: z.string().min(3).max(200).nullish(),
				slug: z.string().min(3).max(100),
				contentHTML: z.string().default('\n'),
				contentText: z.string().default(''),
				image: z.boolean().default(false),
				imageExt: z.string().nullish(),
				imageKey: z.string().nullish(),
				status: z
					.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
					.default('DRAFT'),
				tags: z.array(z.number()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { tags, author, ...rest } = input
			const post = await ctx.db.post.create({
				data: {
					authorId: author,
					...rest,
					tags: {
						createMany: {
							data: tags.map((tag) => ({
								tagId: Number(tag),
							})),
							skipDuplicates: true,
						},
					},
				},
			})
			if (!post) throw new Error('Post not created')
			else
				return {
					data: post,
					image: {
						action: input.image == true ? 'upload' : null,
						key: input.imageKey,
						ext: input.imageExt,
					},
				}
		}),
	edit: protectedProcedure
		.input(
			z.object({
				previousData: z.object({
					...zPost.shape,
					tags: z.array(Tag),
					author: z.object({
						id: User.shape.id,
						name: User.shape.name,
						firstName: User.shape.firstName,
						lastName: User.shape.lastName,
					}),
				}),
				newData: z.object({
					...Post.omit({ id: true }).partial().shape,
					id: z.coerce.number<string | number>(),
					image: z.boolean(),
					imageExt: z.string().nullish(),
					imageKey: z.string().nullish(),
					tags: z.object({
						newTags: z.array(z.number()),
						removedTags: z.array(z.number()),
					}),
					author: z
						.object({
							id: User.shape.id,
							name: User.shape.name,
							firstName: User.shape.firstName,
							lastName: User.shape.lastName,
						})
						.or(z.string())
						.optional(),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { previousData, newData } = input
			newData.updatedAt = new Date()

			const { tags, author, ...updateData } = newData

			if (author) {
				if (typeof author === 'string') {
					updateData.authorId = author
				} else {
					updateData.authorId = author.id
				}
			}

			const update = await ctx.db.post.update({
				where: {
					id: newData.id,
				},
				data: {
					...updateData,
					tags: {
						createMany: {
							data:
								tags?.newTags?.map((tag) => ({
									tagId: Number(tag),
								})) ?? [],
							skipDuplicates: true,
						},
						deleteMany: {
							tagId: {
								in: tags?.removedTags?.map((tag) => Number(tag)),
							},
						},
					},
				},
			})

			return {
				id: newData.id,
				previousData,
				newData: update,
				image: {
					action:
						typeof newData.image == 'boolean' ?
							newData.image == true ?
								'upload'
							:	'delete'
						:	null,
				},
			}
		}),
	delete: protectedProcedure
		.input(z.coerce.number())
		.mutation(async ({ ctx, input }) => {
			const deletePost = await ctx.db.post.delete({
				where: { id: input },
			})

			if (!deletePost) throw new Error('Post not deleted')
			else {
				if (deletePost.image) {
					const deleteImage = await deleteFile(
						`${deletePost.imageKey}.${deletePost.imageExt}`
					)

					if (deleteImage.$metadata.httpStatusCode != 204) {
						console.error('Image not deleted from S3/R2')
					}
				}

				return deletePost
			}
		}),
	getById: publicProcedure
		.input(z.coerce.number())
		.query(async ({ ctx, input }) => {
			const post = await ctx.db.post.findUnique({
				where: { id: input },
				include: {
					author: {
						select: {
							id: true,
							name: true,
							firstName: true,
							lastName: true,
						},
					},
					tags: {
						select: {
							tag: true,
						},
					},
				},
			})
			if (!post) return null

			const parsed = z
				.object({
					...Post.shape,
					author: User.pick({
						id: true,
						name: true,
						firstName: true,
						lastName: true,
					}),
					tags: z
						.object({
							tag: z.object({
								...prismaSchema.PostTag.relations.shape.tag.shape,
							}),
						})
						.array()
						.transform((tags) => {
							return tags.map(({ tag }) => tag)
						}),
				})
				.safeParse(post)
			if (parsed.success) {
				return parsed.data
			}
		}),
	page: publicProcedure
		.input(
			z
				.object({
					slug: z.string(),
				})
				.or(z.object({ id: z.coerce.number() }))
		)
		.query(async ({ ctx, input }) => {
			const post = await ctx.db.post.findFirst({
				where:
					'id' in input ? { id: input.id } : { slug: input.slug },
				include: {
					author: {
						include: {
							socials: {
								select: {
									handle: true,
									social: true,
								},
							},
						},
					},
					tags: {
						select: {
							tag: true,
						},
					},
				},
			})
			if (!post) return null

			return post
		}),
})
