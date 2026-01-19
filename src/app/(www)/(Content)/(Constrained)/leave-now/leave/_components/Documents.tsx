'use client'

import { Subsection } from '~/components/Structure/Subsection'
import { InlineLink } from '~/components/Text/Link'

export const LeaveNowDocuments = () => {
	return (
		<Subsection>
			<Subsection.Heading>Documents</Subsection.Heading>
			<Subsection.List>
				<InlineLink
					href='/pdf/Get-Your-Documents-Ready.pdf'
					target='_blank'>
					Get Your Documents Ready
				</InlineLink>
				<InlineLink
					href='/pdf/Passport-Checklist.pdf'
					target='_blank'>
					Apply for a passport
				</InlineLink>
				<InlineLink
					href='/pdf/REAL-ID-Checklist.pdf'
					target='_blank'>
					REAL ID
				</InlineLink>
				<InlineLink
					href='/pdf/Replace-Birth-Certificate-Checklist.pdf'
					target='_blank'>
					Birth certificate
				</InlineLink>
			</Subsection.List>
		</Subsection>
	)
}
