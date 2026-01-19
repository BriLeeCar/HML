'use client'

import { Subsection } from '~/components/Structure/Subsection'
import { InlineLink } from '~/components/Text/Link'

export const ChoosingDestination = () => (
	<Subsection>
		<Subsection.Heading>Choosing your destination</Subsection.Heading>
		<Subsection.List>
			<InlineLink href='/claiming-asylum'>
				Claiming Asylum: What it Means and Where to Start
			</InlineLink>
			<InlineLink href='/explorer'>Visa Explorer</InlineLink>
		</Subsection.List>
	</Subsection>
)
