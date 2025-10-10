import { User } from '~/server/api/zod'
import { auth } from '~/server/auth'
import { db } from '~/server/db'
import { HydrateClient } from '~/trpc/server'
import { BlogForm } from '../Form'

const AddBlogPage = async () => {
	const authorId = (await auth())?.user?.id

	let [authorData, allTags] = await db.$transaction([
		db.user.findUnique({
			where: { id: authorId },
		}),
		db.tag.findMany(),
	])

	authorData = authorData ? User.parse(authorData) : null

	if (!authorData) return <div>Login unable to be verified</div>

	return (
		authorData && (
			<HydrateClient>
				<BlogForm
					data={{
						author: authorData,
						id: 0,
						type: 'add',
						contentHTML: '\n',
						contentText: '',
						authorId: authorData.id,
						metaDescription: '',
						image: false,
						imageKey: null,
						imageExt: null,
						contentDelta: null as unknown as string,
						name: '',
						slug: '',
						status: 'DRAFT',
						subtitle: '',
						tags: [],
						createdAt: new Date(),
						updatedAt: new Date(),
					}}
					allTags={allTags}
				/>
			</HydrateClient>
		)
	)
}

export default AddBlogPage
