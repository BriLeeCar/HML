import fs from 'fs'
import { notFound } from 'next/navigation'
import path from 'path'
import { countryBasics } from '~/data/baseCountryApi'
import countryPaths from '~/data/countryDataWithPaths.json'
import { MDXProcessor } from '~/MDX/ProcessMDX'
import { Base } from './Base'

export const generateStaticParams = () => {
	return countryPaths
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
			console.log(`No section file found for ${country} - ${section}`)
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
