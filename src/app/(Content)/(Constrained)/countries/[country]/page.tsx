import countries from '~/server/db/pathways.json'

import { Base } from './Base'
import { MatchingPathways } from './MatchingPathways'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 86400
export const fetchCache = 'force-cache'

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
