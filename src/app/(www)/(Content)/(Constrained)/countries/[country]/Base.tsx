'use client'

import { notFound } from 'next/navigation'
import { useContext } from 'react'
import { IconAttributes } from '~/components/Flag'
import { Page, PageEyebrow, PageHeading, PageHGroup } from '~/components/Structure/Page'
import { toTitleCase } from '~/lib/text'
import { DBContext } from '~/server/db/provider'
import { Stats } from './_components/Stats'
import { SubMenu } from './_components/SubMenu'

export const Base = ({
	countryName,
	section,
	children,
}: {
	countryName: string
	section?: string
	children: ReactNode
}) => {
	const db = useContext(DBContext)
	const country = db.getCountryByAbbr(countryName)

	if (!country) {
		notFound()
	}

	return (
		<Page>
			<PageHGroup>
				<PageEyebrow>
					<IconAttributes
						as='span'
						attr={db.getCommunityAttributes(country)}
						className='text-foreground w-max'
					/>
				</PageEyebrow>
				<PageHeading>{toTitleCase(country.name)}</PageHeading>
			</PageHGroup>
			<SubMenu
				active={section}
				country={countryName}
			/>

			{children}
			{section == 'Basics' && <Stats countryStats={db.getCountryStats(country)} />}
		</Page>
	)
}
