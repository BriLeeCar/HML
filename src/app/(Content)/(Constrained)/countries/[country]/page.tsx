import fs from 'fs'
import path from 'path'
import { MDXProcessor } from '~/lib/mdx'
import countries from '~/server/db/countries.json'
import db from '~/server/db/db'
import { Base } from './Base'
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

	if (content == null) {
		content = {
			Provider: () => 'Content coming soon...',
		}
	}

	return (
		<Base
			section={section}
			countryName={country}>
			{content ?
				<content.Provider />
			:	<div className='w-full text-center font-black capitalize italic not-dark:opacity-60 dark:font-semibold'>
					Content coming soon....
				</div>
			}
		</Base>
	)
}

export default CountryPage
