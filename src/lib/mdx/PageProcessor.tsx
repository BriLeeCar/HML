import { Suspense } from 'react'
import {
	AlertCallout,
	Icon,
	InlineLink,
	Page,
	PageHeading,
	SectionHeading,
} from '~/components'
import { MDXProcessor, MDXProvider } from '~/lib/mdx'
import { toTitleCase } from '~/lib/text'

export const MDXPageProcessor = ({ slug }: { slug: string }) => {
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
	return (
		<Page>
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
		</Page>
	)
}
