'use client'

import { Heading } from '~/components/Heading'
import { zodCountryRest } from '~/data/baseCountryApi'
import {
	CountryStore,
	useCountryStore,
} from '~/data/stores/countryStore'
import { toTitleCase } from '~/util/text'
import { IconAttributes } from './IconnedStats'
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
	const store = useCountryStore()
	store.verifyCountry(country.toUpperCase())

	return (
		<>
			<span className='relative'>
				<IconAttributes
					un={countryData.unMember}
					pride
					trans
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
			<section className='border-border dark:bg-card/50 w-full grow rounded-lg border-1 bg-zinc-100 p-6 shadow-sm'>
				{children}
			</section>
			{!section && (
				<Stats
					countryStats={
						store.countries.find(
							(c) => c.abbr === country.toUpperCase()
						) as CountryStore['countries'][number]
					}
				/>
			)}
		</>
	)
}
