import fs from 'fs'
import { Suspense } from 'react'
import { AlertCallout } from '~/components/AlertCallout'
import { Icon } from '~/components/Icon'
import { MDXProcessor, MDXProvider } from '~/lib/mdx'
import { toTitleCase } from '~/lib/text'
import {
	InlineLink,
	Page as PageEl,
	PageHeading,
	SectionHeading,
} from '../../Components'

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
		.replaceCTA()
		.replaceSubheadings()
		.replaceSubSections()
		.replaceCustomMDX()
		.setComponents({
			h2: (props) => <SectionHeading {...props} />,
		})

	const { subtitle, type, title, description, warnings } =
		data.frontmatter as {
			subtitle?: string
			type?: string
			title?: string
			description?: string
			warnings?: string[]
		}

	const parsedSlug = toTitleCase(slug.replace(/-/g, ' '))
	const ProcessSubtitle = () => {
		if (warnings && warnings.length > 0) {
			return (
				<MDXProvider
					source={warnings.join('\n\n')}
					components={{
						...data.components,
						p: AlertCallout,
						a: InlineLink,
					}}
				/>
			)
		} else if (subtitle) {
			return <span>{subtitle}</span>
		}
		return null
	}

	console.log(data.raw)

	return (
		<PageEl>
			<Suspense fallback={<div>Loading...</div>}>
				<PageHeading
					subtitle={ProcessSubtitle()}
					eyebrow={
						<span className='flex items-center gap-1'>
							{toTitleCase(type as string)}s{' '}
							<Icon IconName='ArrowRightIcon' /> {description}
						</span>
					}>
					{title || parsedSlug}
				</PageHeading>
				<data.Provider />
			</Suspense>
		</PageEl>
	)
}

export default Page
