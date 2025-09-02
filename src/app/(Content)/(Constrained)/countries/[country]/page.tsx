import countries from '~/server/db/countries.json'
import { Base } from './Base'
import { MatchingPathways } from './MatchingPathways'

export const generateStaticParams = async () => {
	return countries
		.filter((ea) => ea.abbr)
		.map((ea) => {
			return {
				country: ea.abbr.toUpperCase(),
			}
		})
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
