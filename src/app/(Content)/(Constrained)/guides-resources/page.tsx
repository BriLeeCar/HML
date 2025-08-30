import { Divider, Page, PageHeading } from '@/(Content)/Components'
import { readdirSync, readFileSync } from 'fs'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'
import { Suspense } from 'react'
import { toTitleCase } from '~/lib/text'
import { BlogContent } from './BlogContent'
import { GuidesContent } from './Guides'

const GuidesResourcesPage = async () => {
	const getBlogPosts = readdirSync(
		path.join(process.cwd(), 'src/data/blog')
	)

	const getPDFS = readdirSync(path.join(process.cwd(), 'public/pdf'))

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
	const pdfGuides = (
		await Promise.all(
			getPDFS.map(async (file) => {
				let parsedFile = file.replace('.pdf', '').replaceAll('-', ' ')

				let subtitle = ''

				if (parsedFile.includes('Checklist')) {
					subtitle = 'Checklist'
				}
				if (
					parsedFile.includes('How')
					|| parsedFile.includes('General')
				) {
					subtitle = 'Guide'
				}
				parsedFile = parsedFile
					.replace('Checklist', '')
					.replace('How To', '')
					.replace('Guide', '')
					.replace('General', '')

				return {
					title: toTitleCase(parsedFile.trim()),
					link: `/pdf/${file}`,
					type: 'pdf',
					subtitle: subtitle ? subtitle : undefined,
				}
			})
		)
	).filter((ea) => ea) as {
		title: string
		link: string
		type: 'pdf'
	}[]

	return (
		<Page>
			<PageHeading
				eyebrow='Guides & Resources'
				subtitle='Welcome to our library of heavily researched, and thoughtfully curated, resources. These guides are designed to help you navigate the complexities of planning your evacuation, offering practical advice and insights to empower your journey.'>
				The Library
			</PageHeading>
			{/* <Tabs /> */}
			<Suspense fallback={<div>Loading...</div>}>
				<GuidesContent pdfGuides={pdfGuides} />
				<Divider />
				<BlogContent blogPosts={blogPosts} />
			</Suspense>
		</Page>
	)
}

export default GuidesResourcesPage
