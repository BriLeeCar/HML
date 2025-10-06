import z from 'zod'
import { zBlogPostDBSchema } from '~/lib/zod'
import { db } from '~/server/db'
import { HydrateClient } from '~/trpc/server'
import { BlogForm } from '../_components'

const EditBlogPost = async ({
	searchParams,
}: PageProps<'/admin/blog/edit'>) => {
	const { id } = await searchParams
	const blogPost = await db.post.findUnique({
		where: { id: Number(id) },
		include: {
			author: true,
		},
	})

	const data = zBlogPostDBSchema
		.extend({
			author: z.object({
				id: z.string(),
				firstName: z.string(),
				lastName: z.string(),
				fullName: z.string(),
			}),
		})
		.pipe(
			z.transform((post) => ({
				...post,
				title: post.name,
				text: post.contentText,
				content: post.contentHTML,
				type: 'edit',
			}))
		)
		.safeParse(blogPost).data
	if (!data) return <div>Post not found</div>
	return (
		<HydrateClient>
			<BlogForm data={data} />
		</HydrateClient>
	)
}

export default EditBlogPost
