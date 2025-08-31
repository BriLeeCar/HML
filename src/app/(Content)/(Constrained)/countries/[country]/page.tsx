import fs from 'fs'
import path from 'path'
import {
	CTA,
	Divider,
	InlineLink,
	P,
	Section,
	SectionHeading,
} from '~/components'
import { MDXProcessor } from '~/lib/mdx'
import countries from '~/server/db/countries.json'
import db from '~/server/db/db'
import { Base } from './Base'
import { MatchingPathways } from './MatchingPathways'
import { Pathways } from './Pathways'

export const generateStaticParams = () => {
	return countries
		.filter((ea) => ea.abbr)
		.map((ea) => {
			return {
				country: ea.abbr.toLowerCase(),
			}
		})
}

const CheckForMDX = (country: string) => {
	const file = path.join('src', 'data', 'country', `${country}.mdx`)
	try {
		if (fs.existsSync(path.join(process.cwd(), file))) {
			return new MDXProcessor(file, 'path')
		} else {
			return null
		}
	} catch (e: unknown) {
		console.error(`Error checking for section file: ${e as string}`)
		return null
	}
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

const CountryPage = async ({
	params,
	searchParams,
}: Slug<{ country: string }> & {
	searchParams: Promise<{ section?: string }>
}) => {
	const { country } = await params
	const { section } = await searchParams

	let content = null

	const pathway = db().getCountryByAbbr(country)

	if (section) {
		if (section == 'pathways')
			content = {
				Provider: () => (
					<Pathways
						pathways={pathway?.pathways || []}
						name={pathway?.name || ''}
					/>
				),
			}
		else content = CheckForSectionMDX(country, section)
	} else {
		content = CheckForMDX(country)
	}

	if (!section && !content) {
		content = {
			Provider: () => <MatchingPathways country={country} />,
		}
	}

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
						<P></P>
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

export default CountryPage
