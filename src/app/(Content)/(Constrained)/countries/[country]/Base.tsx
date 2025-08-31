'use client'

import { notFound } from 'next/navigation'
import { useContext } from 'react'
import { toTitleCase } from '~/lib/text'
import { DBContext } from '~/server/db/provider'

import { IconAttributes, Page, PageHeading } from '~/components'
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
			<Page>
				<PageHeading
					eyebrow={
						<IconAttributes
							as='span'
							attr={db.getCommunityAttributes(country)}
							className='text-foreground w-max'
						/>
					}>
					{toTitleCase(country.name)}
				</PageHeading>
				<SubMenu
					active={section}
					country={countryName}
				/>

				{children}
				{!section && (
					<Stats countryStats={db.getCountryStats(country)} />
				)}
			</Page>
		</>
	)
}
