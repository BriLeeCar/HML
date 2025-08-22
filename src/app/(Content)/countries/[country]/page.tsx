import fs from 'fs'
import { notFound } from 'next/navigation'
import { countryBasics } from '~/data/baseCountryApi'
import countryPaths from '~/data/countryDataWithPaths.json'
import { MDXProcessor } from '~/MDX/ProcessMDX'
import { Base } from './Base'

export const generateStaticParams = async () => {
	return countryPaths
		.filter((ea) => ea.abbr)
		.map((ea) => {
			return {
				country: ea.abbr.toLowerCase(),
			}
		})
}

const CheckForMDX = (country: string) => {
	if (fs.existsSync(`src/data/country/${country}.mdx`)) {
		return new MDXProcessor(`src/data/country/${country}.mdx`, 'path')
	}
}
const CheckForSectionMDX = (country: string, section: string) => {
	const file = `src/data/country/${country}/${section}.mdx`
	console.log('Checking for section MDX:', file)
	if (fs.existsSync(file)) {
		return new MDXProcessor(file, 'path')
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

	const data = await countryBasics({ abbr: country })

	if (!data || data == null) {
		notFound()
	}

	const content =
		section ?
			CheckForSectionMDX(country, section)
		:	CheckForMDX(country)

	return (
		<Base
			countryData={data}
			section={section}
			country={country}>
			{content ?
				<div className='flex items-start justify-center gap-4 sm:flex-row sm:gap-8'>
					<section>
						<content.Provider />
					</section>
				</div>
			:	<div className='w-full text-center font-black capitalize italic not-dark:opacity-60 dark:font-semibold'>
					Content coming soon....
				</div>
			}
		</Base>
	)
}

export default CountryPage
