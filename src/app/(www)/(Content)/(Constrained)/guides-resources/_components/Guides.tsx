'use client'

import { Section } from '~/components/Structure/Section'
import { resources, ResourceSection } from '..'

export const GuidesContent = () => {
	return (
		<Section>
			<Section.HGroup>
				<Section.Eyebrow>How-To Guides & Resources</Section.Eyebrow>
				<Section.Heading>Hope this helps</Section.Heading>
				<Section.Subtitle>
					We know this process can be overwhelming. These guides and resources are designed to help
					you navigate the complexities of planning your evacuation, offering practical advice and
					insights to empower your journey.
				</Section.Subtitle>
			</Section.HGroup>
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
