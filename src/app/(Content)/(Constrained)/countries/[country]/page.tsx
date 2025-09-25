import { Metadata } from 'next'
import { toTitleCase } from '~/lib/text'
import countries from '~/server/db/countries.json'
import { Base } from './Base'
import { MatchingPathways } from './MatchingPathways'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 86400
export const fetchCache = 'force-cache'

export const generateMetadata = async ({
	params,
}: PageProps<'/countries/[country]'>): Promise<Metadata> => {
	const abbr = (await params).country
	const country = toTitleCase(
		countries
			.find((c) => c.abbr.toLowerCase() === abbr.toLowerCase())
			?.name?.replace('-', '')
	)

	return {
		title: `${country}`,
		description: `Information about asylum pathways, visa options, and travel resources for ${country}.`,
	}
}

export const generateStaticParams = async () => {
	return [
		...new Set(
			countries
				.filter((ea) => ea.abbr)
				.map((ea) => {
					return {
						country: ea.abbr.toUpperCase(),
					}
				})
		),
	]
}

const CountryPage = async ({
	params,
}: Slug<{ country: string }> & {}) => {
	const { country } = await params

	return (
		<Base
			section={'Basics'}
			countryName={country}>
			<MatchingPathways country={country} />
		</Base>
	)
}

export default CountryPage
