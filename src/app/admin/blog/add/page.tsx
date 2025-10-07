import { zBlogPostAddSchema, zUserDBSchema } from '~/lib/zod'
import { auth } from '~/server/auth'
import { db } from '~/server/db'
import { HydrateClient } from '~/trpc/server'
import { BlogForm } from '../_components/Form'

const AddBlogPage = async () => {
	const authorId = (await auth())?.user?.id
	const author = zUserDBSchema.safeParse(
		await db.user.findUnique({
			where: { id: authorId },
		})
	)

	if (!author.success) return <div>Login unable to be verified</div>
	const baseData = zBlogPostAddSchema.safeParse({
		type: 'add',
		author: author.data,
	})

	if (baseData.data) {
		return (
			author && (
				<HydrateClient>
					<BlogForm data={baseData.data} />
				</HydrateClient>
			)
		)
	}
}

export default AddBlogPage
