import { tCountryKeys } from '@/map/util'
import fs from 'fs'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Heading } from '~/components/Heading'
import { countryBasics } from '~/data/baseCountryApi'
import countryPaths from '~/data/mapPathData.json'
import { MDXProcessor } from '~/MDX/ProcessMDX'
import { toTitleCase } from '~/util/text'
import { QuickFacts } from './QuickFacts'

export const generateStaticParams = async () => {
	return Object.keys(countryPaths).map((countryName) => {
		return {
			country:
				countryPaths[countryName as tCountryKeys].abbr.toLowerCase(),
		}
	})
}

const CheckForMDX = (country: string) => {
	if (fs.existsSync(`src/data/country/${country}.mdx`)) {
		return new MDXProcessor(`src/data/country/${country}.mdx`, 'path')
	}
}

const CountryPage = async ({ params }: Slug<{ country: string }>) => {
	const { country } = await params
	const data = await countryBasics({ abbr: country })

	if (!data || data == null) {
		notFound()
	}

	const content = CheckForMDX(country)
	content?.removeTitle()

	return (
		<div className='mx-auto max-w-3xl px-4 py-8'>
			<Heading
				level={2}
				size={'title'}>
				{toTitleCase(data.name.common)}
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
			{content && (
				<div className='flex items-start justify-center gap-4 py-4 sm:flex-row sm:gap-8'>
					<section>
						<content.Provider />
					</section>
				</div>
			)}
		</div>
	)
}

export default CountryPage
