import z from 'zod'
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '../trpc'

const zPost = z.object({
	name: z.string(),
	subtitle: z.string(),
	image: z.file().or(z.boolean()).optional(),
	slug: z.string(),
	tags: z.array(z.number()).optional(),
	author: z.string(),
	contentHTML: z.string().optional(),
	contentText: z.string().optional(),
})

const handleCreateOrUpdate = (input: z.infer<typeof zPost>) => ({
	name: input.name,
	subtitle: input.subtitle,
	slug: input.slug,
	authorId: input.author,
	contentHTML: input.contentHTML ?? '',
	contentText: input.contentText ?? '',
	image: input.image ? true : false,
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
		.input(zPost)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.post.create({
				data: {
					...handleCreateOrUpdate(input),
					tags: {
						createMany: {
							data:
								input.tags?.map((tag) => ({
									tagId: Number(tag),
								})) ?? [],
							skipDuplicates: true,
						},
					},
					postVersionHistories: {
						create: {
							action: 'created',
							userId: input.author,
						},
					},
				},
			})
		}),
	edit: protectedProcedure
		.input(zPost)
		.mutation(async ({ ctx, input }) => {
			const previousData = await ctx.db.post.findUnique({
				where: { slug: input.slug },
				include: { tags: true },
			})

			const data = handleCreateOrUpdate(input)

			const changes = Object.entries(data)
				.map(([key, value]) => {
					if (
						previousData
						&& previousData[key as keyof typeof data] !== value
					) {
						return `${key}`
					}
					return null
				})
				.filter(Boolean)

			const updated = await ctx.db.post.update({
				where: { slug: input.slug },
				data: {
					...handleCreateOrUpdate(input),
					tags: {
						createMany: {
							data:
								input.tags?.map((tag) => ({
									tagId: Number(tag),
								})) ?? [],
							skipDuplicates: true,
						},
						deleteMany: {
							NOT: {
								tagId: { in: input.tags?.map((tag) => Number(tag)) },
							},
						},
					},
					postVersionHistories: {
						create: {
							action: 'updated - ' + changes.join(', '),
							userId: input.author,
						},
					},
				},
			})
			return updated
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
			return post
		}),
})
