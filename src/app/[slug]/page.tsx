import fs from 'fs'
import { Heading } from '~/components/Heading'
import { MDXProcessor } from '~/MDX/ProcessMDX'
import { toTitleCase } from '~/util/text'

export const generateStaticParams = async () => {
	const pages = fs.readdirSync('src/data/pages')
	return pages.map((page) => {
		const slug = page.replace('.mdx', '')
		return { slug }
	})
}

const Page = async ({
	params,
}: {
	params: Promise<{ slug: string }>
}) => {
	const { slug } = await params
	const data = new MDXProcessor(
		`src/data/pages/${slug}.mdx`,
		'path'
	).removeTitle()

	return (
		<main className='mx-auto max-w-2xl px-4 py-8'>
			<Heading
				level={1}
				size={'title'}
				className='font-serif font-medium tracking-tight italic'>
				{data.title || toTitleCase(slug.replace(/-/g, ' '))}
			</Heading>
			<data.Provider />
		</main>
	)
}

export default Page
