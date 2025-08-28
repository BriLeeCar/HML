import { Page, PageHeading } from '@/(Content)/Components'
import { readdirSync, readFileSync } from 'fs'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'
import { Suspense } from 'react'
import { BlogContent } from './BlogContent'

const GuidesResourcesPage = async () => {
	const getBlogPosts = readdirSync(
		path.join(process.cwd(), 'src/data/blog')
	)

	const blogPosts = (await Promise.all(
		getBlogPosts.map(async (file) => {
			const post = readFileSync(
				path.join(process.cwd(), 'src/data/blog', file)
			)
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
				subtitle='Welcome to our library of heavily researched, and thoughtfully curated, resources. These guides are designed to help you navigate the complexities of planning your evacuation, offering practical advice and insights to empower your journey.'>
				The Library
			</PageHeading>
			<Suspense fallback={<div>Loading...</div>}>
				<BlogContent blogPosts={blogPosts} />
			</Suspense>
		</Page>
	)
}

export default GuidesResourcesPage
