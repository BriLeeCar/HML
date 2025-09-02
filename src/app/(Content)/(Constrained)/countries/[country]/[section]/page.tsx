import fs from 'fs'
import path from 'path'
import {
	CTA,
	Divider,
	InlineLink,
	Section,
	SectionHeading,
} from '~/components'
import { MDXProcessor } from '~/lib/mdx'
import countries from '~/server/db/countries.json'
import db from '~/server/db/db'
import { Base } from '../Base'
import { Pathways } from '../Pathways'

const sectionArr = [
	'basics',
	'pathways',
	'economy',
	'social',
	'employment',
	'housing',
	'medical',
]

export const generateStaticParams = async () => {
	const countrySections = countries
		.map((ea) => ea.abbr)
		.filter((ea) => ea)
		.flatMap((country) => {
			return sectionArr.map((section) => ({
				country: country?.toUpperCase() || '',
				section,
			}))
		})
	return countrySections
}

const CheckForSectionMDX = (country: string, section: string) => {
	const file = path.join(
		'src',
		'data',
		'country',
		country,
		`${section}.mdx`
	)
	try {
		if (fs.existsSync(path.join(process.cwd(), file))) {
			return new MDXProcessor(file, 'path')
		} else {
			return null
		}
	} catch (e) {
		console.error(`Error checking for section file: ${e}`)
		return null
	}
}

const SectionPage = async ({
	params,
}: {
	params: Promise<{
		country: string
		section: string
	}>
}) => {
	const { country, section } = await params

	const pathway = db().getCountryByAbbr(country)

	const content =
		section == 'pathways' ?
			{
				Provider: () => (
					<Pathways
						pathways={pathway?.pathways || []}
						name={pathway?.name || ''}
					/>
				),
			}
		:	CheckForSectionMDX(country, section)

	return (
		<Base
			section={section}
			countryName={country}>
			{content ?
				<content.Provider />
			:	<>
					<Section>
						<SectionHeading
							eyebrow='No content found'
							subtitle={
								<>
									I'm sure someone will add some soon! Please keep
									checking back, or{' '}
									<InlineLink href='/guides-resources'>
										read our guides
									</InlineLink>{' '}
									in the meantime.
								</>
							}>
							This country doesn't have any content yet.
						</SectionHeading>
					</Section>

					<Divider />
					<CTA
						subtitle='If you are at-risk and need help finding a safe pathway, please reach out to our support team.'
						primaryAction={{
							href: '/support',
							label: 'Get in touch',
						}}
						secondaryAction={{
							href: '/guides-resources',
							label: 'Read our guides',
						}}>
						Need help now?
					</CTA>
				</>
			}
		</Base>
	)
}

export default SectionPage
