import { readdirSync, readFileSync } from 'fs'
import type { Metadata } from 'next'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'
import { Suspense } from 'react'
import { Page, PageHeading } from '~/components'
import { BlogContent } from './_components/BlogContent'
import { GuidesContent } from './_components/Guides'

export const metadata: Metadata = {
	title: 'Guides & Resources',
	description: `Explore step-by-step guides and resources for asylum, tracel, documents, and safety — get started with Help Me Leave now.`,
}

const GuidesResourcesPage = async () => {
	const getBlogPosts = readdirSync(path.join(process.cwd(), 'src/data/blog'))

	const blogPosts = (await Promise.all(
		getBlogPosts.map(async file => {
			const post = readFileSync(path.join(process.cwd(), 'src/data/blog', file))
			return {
				...getFrontmatter(post.toString()).frontmatter,
				file: file.replace('.mdx', ''),
			}
		})
	)) as {
		image: { url: string }
		title: string
		date: string
		author?: { name: string }
		file: string
	}[]

	return (
		<Page>
			<PageHeading
				eyebrow='Guides & Resources'
				subtitle={
					<>
						Welcome to our library of heavily researched and thoughtfully curated resources. We will
						be adding to this collection over time, so please check back often for new insights and
						information to support your journey.
					</>
				}>
				The Library
			</PageHeading>

			<Suspense fallback={<div>Loading...</div>}>
				<GuidesContent />
				<BlogContent blogPosts={blogPosts} />
			</Suspense>
		</Page>
	)
}

export default GuidesResourcesPage
