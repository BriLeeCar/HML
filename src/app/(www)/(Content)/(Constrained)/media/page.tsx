import { type Metadata } from 'next'
import { InlineLink } from '~/components'
import {
	Page,
	PageEyebrow,
	PageHeading,
	PageHGroup,
	PageSubtitle,
} from '~/components/Structure/Page'
import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
} from '~/components/Structure/Section'
import { api } from '~/trpc/server'
import { Resource } from '../guides-resources/_components/ResourceList'

export const metadata: Metadata = {
	title: 'Media & Press',
}

export default async function MediaPage() {
	const press = await api.contentResources.getMediaResources()
	const areas =
		press
		&& press.reduce(
			(acc, resource) => {
				let area = acc.find(a => a.area == resource.area)

				if (!area) {
					acc.push({ area: resource.area, tagline: resource.tagline ?? undefined, resources: [] })
					area = acc.find(a => a.area == resource.area)
				}

				area?.resources.push(resource)
				return acc
			},
			[] as {
				area: string
				tagline?: string
				resources: typeof press
			}[]
		)

	return (
		<Page>
			<PageHGroup>
				<PageEyebrow>Press</PageEyebrow>
				<PageHeading>Media & Press</PageHeading>
				<PageSubtitle>
					For media inquiry or expert comment, please{' '}
					<InlineLink href='https://forms.clickup.com/90151711045/f/2kyqbwa5-10135/WAWHBFWDES3CH80TYC'>
						Contact Us
					</InlineLink>
					.
				</PageSubtitle>
			</PageHGroup>
			{areas.map(a => (
				<Section key={a.area}>
					<SectionHGroup>
						<SectionEyebrow>{a.tagline}</SectionEyebrow>
						<SectionHeading>{a.area}</SectionHeading>
					</SectionHGroup>
					{a.resources.map(post => (
						<Resource
							key={post.href.url}
							href={post.href.url}
							title={post.title}
							subtitle={post.subtitle}
							type={post.type}
							Icon={
								post.icon as {
									name: IconKey
									color: `${TW.Colors.String}`
								}
							}
							author={post.author}
							date={post.date}
							target={post.href.target || '_self'}
						/>
					))}
				</Section>
			))}
		</Page>
	)
}
