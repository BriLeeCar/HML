import Image from 'next/image'
import { Heading } from '~/components/Heading'
import { countryBasics } from '~/data/baseCountryApi'
import { toTitleCase } from '~/util/text'
import { QuickFacts } from './QuickFacts'

const CountryPage = async ({ params }: Slug<{ country: string }>) => {
	const { country: countryName } = await params
	const data = await countryBasics({ country: countryName })

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
			<div className='flex w-max flex-col items-start'>
				<Image
					src={data.flags.png}
					alt={data.flags.alt || 'Flag of ' + data.name.common}
					width={320}
					height={213}
					className='shrink rounded-lg shadow-md'
				/>
				{data && <QuickFacts {...data} />}
			</div>
		</div>
	)
}

export default CountryPage
