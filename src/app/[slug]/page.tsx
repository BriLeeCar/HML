import fs from 'fs'
import { MDXProcessor } from '~/MDX/ProcessMDX'

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
	const data = new MDXProcessor(`src/data/pages/${slug}.mdx`, 'path')

	return (
		<main className='mx-auto max-w-2xl px-4 py-8'>
			<data.Provider />
		</main>
	)
}

export default Page
