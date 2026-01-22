'use client'

import { Page } from '~/components/Structure/Page'
import { Bold } from '~/components/Text/Bold'

export const SupportHeading = () => {
	return (
		<Page.HGroup>
			<Page.Eyebrow>Support Team</Page.Eyebrow>
			<Page.Heading>We're here to help</Page.Heading>
			<Page.Subtitle>
				Our goal is to make sure you feel supported in creating the evacuation plan that works best
				for you.
				<Bold className='block'>You are not alone</Bold>
			</Page.Subtitle>
		</Page.HGroup>
	)
}
