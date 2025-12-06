'use client'

import { Section, SectionHeading } from '~/components'
import { resources, ResourceSection } from '..'

export const GuidesContent = () => {
	return (
		<Section>
			<SectionHeading
				id='guides'
				eyebrow='How-To Guides & Resources'
				subtitle='We know this process can be overwhelming. These guides and resources are designed to help you navigate the complexities of planning your evacuation, offering practical advice and insights to empower your journey.'>
				Hope this helps
			</SectionHeading>
			{Object.keys(resources).map(r => (
				<ResourceSection
					key={r}
					sectionTitle={r}
					resourceArray={resources[r].links}
				/>
			))}
		</Section>
	)
}
