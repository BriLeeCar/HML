import { Main } from '@/(Content)/_Layout/Wrapper'
import fs from 'fs'
import { Suspense } from 'react'
import { PageHeading, Section, SectionHeading } from '~/components'
import { MDXProcessor } from '~/lib/mdx'
import { toTitleCase } from '~/lib/text'

export const generateStaticParams = () => {
	const pages = fs.readdirSync('src/data/pages')
	return pages.map((page) => {
		const slug = page.replace('.mdx', '')
		return { slug }
	})
}

const Page = async (props: PageProps<'/[slug]'>) => {
	const { slug } = await props.params
	const data = new MDXProcessor(`src/data/pages/${slug}.mdx`, 'path')
		.removeTitle()
		.setComponents({
			h2: (props) => <SectionHeading {...props} />,
		})

	return (
		<Main>
			<Suspense fallback={<div>Loading...</div>}>
				<PageHeading>
					{data.title || toTitleCase(slug.replace(/-/g, ' '))}
				</PageHeading>
				<Section>
					<data.Provider />
				</Section>
			</Suspense>
		</Main>
	)
}

export default Page
