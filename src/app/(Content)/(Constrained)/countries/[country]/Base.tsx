'use client'

import { notFound } from 'next/navigation'
import { useContext } from 'react'
import { Heading, Section } from '~/components'
import { IconAttributes } from '~/components/Country/IconAttributes'
import { toTitleCase } from '~/lib/text'
import { DBContext } from '~/server/db/provider'
import { Stats } from './Stats'
import { SubMenu } from './SubMenu'

export const Base = ({
	countryName,
	section,
	children,
}: {
	countryName: string
	section?: string
	children: React.ReactNode
}) => {
	const db = useContext(DBContext)
	const country = db.getCountryByAbbr(countryName)

	if (!country) {
		notFound()
	}

	return (
		<>
			<span className='relative'>
				<IconAttributes
					attr={db.getCommunityAttributes(country)}
					className='absolute right-0 bottom-0'
				/>
				<Heading
					size='title'
					className='mb-0 italic'
					level={1}>
					{toTitleCase(country.name)}
				</Heading>
			</span>
			<aside className='relative mb-6 w-max'></aside>

			<section className='relative mb-2 flex w-full flex-col items-baseline justify-around'>
				<SubMenu
					active={section}
					country={countryName}
				/>
			</section>
			<Section className='w-full grow'>{children}</Section>
			{!section && (
				<Stats countryStats={db.getCountryStats(country)} />
			)}
		</>
	)
}
