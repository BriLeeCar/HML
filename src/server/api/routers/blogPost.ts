import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const zPost = z.object({
	title: z.string(),
	subtitle: z.string(),
	image: z.file().or(z.boolean()).optional(),
	slug: z.string(),
	tags: z.array(z.number()).optional(),
	author: z.string(),
	content: z.string().optional(),
	text: z.string().optional(),
});

const handleCreateOrUpdate = (input: z.infer<typeof zPost>) => ({
	name: input.title,
	subtitle: input.subtitle,
	slug: input.slug,
	authorId: input.author,
	contentHTML: input.content ?? "",
	contentText: input.text ?? "",
	image: input.image ? true : false,
});

export const blogPostRouter = createTRPCRouter({
	create: protectedProcedure.input(zPost).mutation(async ({ ctx, input }) => {
		return await ctx.db.post.create({
			data: {
				...handleCreateOrUpdate(input),
				Tag: {
					createMany: {
						data:
							input.tags?.map((tag) => ({
								tagId: Number(tag),
							})) ?? [],
						skipDuplicates: true,
					},
				},
				PostVersionHistory: {
					create: {
						action: "created",
						userId: input.author,
					},
				},
			},
		});
	}),
	edit: protectedProcedure.input(zPost).mutation(async ({ ctx, input }) => {
		const previousData = await ctx.db.post.findUnique({
			where: { slug: input.slug },
			include: { Tag: true },
		});

		const data = handleCreateOrUpdate(input);

		const changes = Object.entries(data)
			.map(([key, value]) => {
				if (previousData && previousData[key as keyof typeof data] !== value) {
					return `${key}`;
				}
				return null;
			})
			.filter(Boolean);

		const updated = await ctx.db.post.update({
			where: { slug: input.slug },
			data: {
				...handleCreateOrUpdate(input),
				Tag: {
					createMany: {
						data:
							input.tags?.map((tag) => ({
								tagId: Number(tag),
							})) ?? [],
						skipDuplicates: true,
					},
				},
				PostVersionHistory: {
					create: {
						action: "updated - " + changes.join(", "),
						userId: input.author,
					},
				},
			},
		});
		return updated;
	}),
});
