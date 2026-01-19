import { readdirSync, readFileSync } from 'fs'
import type { Metadata } from 'next'

import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'
import { Suspense } from 'react'
import {
	Page,
	PageEyebrow,
	PageHeading,
	PageHGroup,
	PageSubtitle,
} from '~/components/Structure/Page'
import { BlogContent } from './_components/BlogContent'
import { GuidesContent } from './_components/Guides'

const getBlogPosts = () => readdirSync(path.join(process.cwd(), 'src/data/blog'))

const processBlogPosts = async () =>
	(await Promise.all(
		getBlogPosts().map(async file => {
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

export const generateStaticParams = async () => {
	const posts = await processBlogPosts()
	return posts.map(ea => ea.file)
}

export const metadata: Metadata = {
	title: 'Guides & Resources',
	description: `Explore step-by-step guides and resources for asylum, tracel, documents, and safety — get started with Help Me Leave now.`,
}

const GuidesResourcesPage = async () => {
	return (
		<Page>
			<PageHGroup>
				<PageEyebrow>Guides & Resources</PageEyebrow>
				<PageHeading>The Library</PageHeading>
				<PageSubtitle>
					Welcome to our library of heavily researched and thoughtfully curated resources. We will
					be adding to this collection over time, so please check back often for new insights and
					information to support your journey.
				</PageSubtitle>
			</PageHGroup>

			<Suspense fallback={<div>Loading...</div>}>
				<GuidesContent />
				<BlogContent blogPosts={await processBlogPosts()} />
			</Suspense>
		</Page>
	)
}

export default GuidesResourcesPage
