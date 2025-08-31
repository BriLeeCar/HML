'use client'

import { useContext, useEffect, useState } from 'react'
import {
	InlineLink,
	List,
	Section,
	SectionHeading,
} from '~/components'
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
							if (f == 'job_required') {
								return !p[f]
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

				<List>
					{pathways.map((pathway) => (
						<li key={pathway.id}>
							{pathway.official_link ?
								<InlineLink
									href={pathway.official_link}
									target='_blank'>
									{pathway.name}
								</InlineLink>
							:	<span className='text-lg font-semibold'>
									{pathway.name}
								</span>
							}
							<br />
							<span className='block pl-8'>
								{pathway.description}
							</span>
						</li>
					))}
				</List>
			</Section>
		)
	)
}
