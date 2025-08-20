import fs from 'fs'
import Image from 'next/image'
import { Heading } from '~/components/Heading'
import { countryBasics } from '~/data/baseCountryApi'
import { MDXProcessor } from '~/MDX/ProcessMDX'
import { toTitleCase } from '~/util/text'
import { QuickFacts } from './QuickFacts'

export const generateStaticParams = async () => {
	const countries = fs.readdirSync('src/data/country')
	return countries.map((country) => {
		const countryName = country.replace('.mdx', '')
		return { country: countryName }
	})
}

const CountryPage = async ({ params }: Slug<{ country: string }>) => {
	const { country: countryName } = await params
	const data = await countryBasics({ country: countryName })
	const content = new MDXProcessor(
		`src/data/country/${countryName}.mdx`,
		'path'
	).removeTitle()

	if (!data) {
		return (
			<div className='mx-auto max-w-3xl px-4 py-8'>
				<Heading
					level={2}
					size={'title'}>
					Country not found
				</Heading>
			</div>
		)
	}
	return (
		<div className='mx-auto max-w-3xl px-4 py-8'>
			<Heading
				level={2}
				size={'title'}>
				{toTitleCase(countryName)}
			</Heading>
			<aside className='flex items-center gap-2'>
				<Image
					src={data.flags.png}
					alt={data.flags.alt || 'Flag of ' + data.name.common}
					width={320}
					height={213}
					className='shrink basis-1/3 rounded-lg shadow-md'
				/>
				{data && <QuickFacts {...data} />}
			</aside>
			<div className='flex items-start justify-center gap-4 py-4 sm:flex-row sm:gap-8'>
				<section>
					<content.Provider />
				</section>
			</div>
		</div>
	)
}

export default CountryPage
