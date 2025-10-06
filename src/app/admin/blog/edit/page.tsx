import { zBlogPostEditSchema } from '~/lib/zod'
import { api, HydrateClient } from '~/trpc/server'
import { BlogForm } from '../_components'

const EditBlogPost = async ({
	searchParams,
}: PageProps<'/admin/blog/edit'>) => {
	const { id } = await searchParams
	const blogPost = await zBlogPostEditSchema.safeParseAsync(
		await api.blogPost.getById(id)
	)

	if (!blogPost || !blogPost.success) return <div>Post not found</div>
	return (
		blogPost.data && (
			<HydrateClient>
				<BlogForm data={blogPost.data} />
			</HydrateClient>
		)
	)
}

export default EditBlogPost
