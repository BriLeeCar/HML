'use client'

import { tPhotoCountry } from '@/(Content)/(Full)/explorer/page'
import { Heading } from '~/components'
import { IconAttributes } from '~/components/Country/IconAttributes'
import { Section } from '~/components/Section'
import { zodCountryRest } from '~/data/baseCountryApi'
import { tCountry, useCountries } from '~/data/stores/countryStore'
import { toTitleCase } from '~/util/text'
import { Stats } from './Stats'
import { SubMenu } from './SubMenu'

export const Base = ({
	countryData,
	country,
	section,
	children,
}: {
	countryData: zodCountryRest
	country: string
	section?: string
	children: React.ReactNode
}) => {
	const store = useCountries()

	return (
		<>
			<span className='relative'>
				<IconAttributes
					country={
						store.countries.find(
							(c) => c.abbr.toLowerCase() === country.toLowerCase()
						) as tPhotoCountry
					}
					className='absolute right-0 bottom-0'
				/>
				<Heading
					size='title'
					className='mb-0 italic'
					level={1}>
					{toTitleCase(countryData.name.common)}
				</Heading>
			</span>
			<aside className='relative mb-6 w-max'></aside>

			<section className='relative mb-2 flex w-full flex-col items-baseline justify-around'>
				<SubMenu
					active={section}
					country={country}
				/>
			</section>
			<Section className='w-full grow'>{children}</Section>
			{!section && (
				<Stats
					countryStats={
						store.countries.find(
							(c) => c.abbr === country.toUpperCase()
						) as tCountry
					}
				/>
			)}
		</>
	)
}
