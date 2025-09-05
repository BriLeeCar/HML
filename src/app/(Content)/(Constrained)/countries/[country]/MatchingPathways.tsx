'use client'

import { Fragment, useContext, useEffect, useState } from 'react'
import { DL, Section, SectionHeading } from '~/components'
import { DBContext } from '~/server/db/provider'

export const MatchingPathways = ({
	country,
}: {
	country: ApiData.Country['abbr']
}) => {
	const [pathways, setPathways] = useState([] as ApiData.Pathway[])
	const data = useContext(DBContext).countries.find(
		(c) => c.abbr.toLowerCase() == country
	)
	useEffect(() => {
		const storedFilters = JSON.parse(
			window.localStorage.getItem('explorer-filters') || '[]'
		) as (keyof ApiData.Pathway)[]

		if (storedFilters.length > 0) {
			setPathways(
				data?.pathways?.filter((p) => {
					if (
						storedFilters.every((f) => {
							if (['prideScore', 'transSafety'].includes(f)) {
								return true
							}
							if (f == 'job_required') {
								return p[f] == false
							}
							return p[f]
						})
					) {
						return true
					}
					return false
				}) || []
			)
		}
	}, [country, data])

	return (
		pathways.length > 0 && (
			<Section>
				<SectionHeading
					eyebrow='Your Pathways'
					subtitle='Here are the pathways that align with your needs'>
					Matching Pathways
				</SectionHeading>

				<DL>
					{pathways.map((pathway) => (
						<Fragment key={pathway.id}>
							<DL.Title href={pathway.official_link ?? undefined}>
								{pathway.name}
							</DL.Title>
							<DL.Item>{pathway.description}</DL.Item>
						</Fragment>
					))}
				</DL>
			</Section>
		)
	)
}
