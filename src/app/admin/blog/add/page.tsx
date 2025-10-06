import { auth } from '~/server/auth'
import { db } from '~/server/db'
import { HydrateClient } from '~/trpc/server'
import { BlogForm } from '../_components/Form'

const AddBlogPage = async () => {
	const authorId = (await auth())?.user?.id
	const author = await db.user.findUnique({
		where: { id: authorId },
	})

	return (
		author && (
			<HydrateClient>
				<BlogForm
					data={{
						// @ts-expect-error mistyped for beta
						author: {
							...author,
							fullName: author?.firstName + ' ' + author?.lastName,
						},
					}}
				/>
			</HydrateClient>
		)
	)
}

export default AddBlogPage
