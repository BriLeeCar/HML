import {
	InlineLink,
	Li,
	Section,
	SectionHeading,
	UL,
} from '~/components'

export const Pathways = ({
	pathways,
	name,
}: {
	pathways: ApiData.Pathway[]
	name: string
}) => {
	return (
		<Section className='md:mt-12'>
			<SectionHeading
				eyebrow={'Pathways'}
				subtitle={`Most official information is from government websites, but some pathways are from community organizations or other sources.`}>
				Pathways to {name}
			</SectionHeading>
			<div className='lg:pr-8'>
				<UL>
					{pathways.map((p) => (
						<Li key={p.id}>
							{p.official_link && typeof p.official_link == 'string' ?
								<InlineLink
									href={p.official_link}
									target='_blank'
									rel='noopener noreferrer'>
									{p.name}
								</InlineLink>
							:	<span className='font-semibold text-red-500'>
									{p.name}
								</span>
							}
							{p.description && (
								<>
									<br />
									<span className='block pl-6'>{p.description}</span>
								</>
							)}
						</Li>
					))}
				</UL>
			</div>
		</Section>
	)
}
