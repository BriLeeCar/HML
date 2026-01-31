import {
	PageEyebrow,
	PageHeading,
	PageHGroup,
	Page as PageLayout,
	PageSubtitle,
} from '@/components/Structure/Page'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'

import { RenderBlocks } from '@/_payload/blocks/RenderBlocks'
import { toTitleCase } from '@/lib/toTitleCase'
import { redirect } from 'next/navigation'
import PageClient from './page.client'

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Page({ params: paramsPromise }: Args) {
	const { slug = 'home' } = await paramsPromise

	// Decode to support slugs with special characters
	const decodedSlug = decodeURIComponent(slug)

	let page: RequiredDataFromCollectionSlug<'pages'> | null

	page = await queryPageByPath({
		path: decodedSlug,
	})

	if (!page) {
		return redirect('/not-found')
	}

	const { content } = page

	return (
		<PageLayout>
			<PageHGroup>
				<PageEyebrow>{toTitleCase(page.slug.replaceAll('-', ' '))}</PageEyebrow>
				<PageHeading>{page.title}</PageHeading>
				<PageSubtitle>{page.subtitle}</PageSubtitle>
			</PageHGroup>
			<PageClient />
			{/* Allows redirects for valid pages too */}
			{content && <RenderBlocks blocks={content} />}
		</PageLayout>
	)
}

const queryPageByPath = cache(async ({ path }: { path: string }) => {
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'pages',
		limit: 1,
		pagination: false,
		where: {
			path: {
				equals: path,
			},
			status: {
				equals: true,
			},
		},
	})

	return result.docs?.[0] || null
})
