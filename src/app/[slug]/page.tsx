import { MDXProcessor } from '~/MDX/ProcessMDX'

const Page = async ({
	params,
}: {
	params: Promise<{ slug: string }>
}) => {
	const { slug } = await params
	const data = new MDXProcessor(`src/data/pages/${slug}.mdx`, 'path')

	return (
		<main className='mx-auto max-w-2xl px-4 py-8'>
			<data.Provider />
		</main>
	)
}

export default Page
