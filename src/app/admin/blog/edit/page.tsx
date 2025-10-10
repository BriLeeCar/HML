import { api, HydrateClient } from '~/trpc/server'
import { BlogForm } from '../Form'

const EditBlogPost = async ({
	searchParams,
}: PageProps<'/admin/blog/edit'>) => {
	const { id } = await searchParams
	const blogPost = await api.blogPost.getById(id)

	if (!blogPost) return <div>Post not found</div>

	return (
		blogPost && (
			<HydrateClient>
				<BlogForm data={{ ...blogPost, type: 'edit' }} />
			</HydrateClient>
		)
	)
}

export default EditBlogPost
