import { InlineLink, Li, UL } from '~/components'
import { Section } from '~/components/Structure/Section'

export const Pathways = ({ pathways, name }: { pathways: ApiData.Pathway[]; name: string }) => {
	return (
		<Section>
			<Section.HGroup>
				<Section.Eyebrow>Pathways</Section.Eyebrow>
				<Section.Heading>Pathways to {name}</Section.Heading>
				<Section.Subtitle>
					Most official information is from government websites, but some pathways are from
					community organizations or other sources.
				</Section.Subtitle>
			</Section.HGroup>

			<UL>
				{pathways.map(p => (
					<Li key={p.id}>
						{p.official_link && typeof p.official_link == 'string' ?
							<InlineLink
								href={p.official_link}
								target='_blank'
								rel='noopener noreferrer'>
								{p.name}
							</InlineLink>
						:	<span className='font-semibold text-red-500'>{p.name}</span>}
						{p.description && (
							<>
								<br />
								<span className='block pl-6'>{p.description}</span>
							</>
						)}
					</Li>
				))}
			</UL>
		</Section>
	)
}
