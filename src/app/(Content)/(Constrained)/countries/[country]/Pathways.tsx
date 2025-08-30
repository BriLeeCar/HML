import {
	InlineLink,
	Section,
	SectionHeading,
	SubSection,
} from '@/(Content)/Components'
import { List } from '~/components/Text'

export const Pathways = ({
	pathways,
	name,
}: {
	pathways: ApiData.Pathway[]
	name: string
}) => {
	const categories = Array.from(
		new Set(pathways.map((p) => p.category))
	)
	const subs =
		categories.map((cat) => {
			return {
				category: cat,
				subs: Array.from(
					new Set(
						pathways
							.filter((p) => p.category === cat)
							.map((p) => p.sub)
					)
				),
			}
		}) || []

	return (
		<Section className='md:mt-12'>
			<SectionHeading
				eyebrow={'Pathways'}
				subtitle={`Most official information is from government websites, but some pathways are from community organizations or other sources.`}>
				Pathways to {name}
			</SectionHeading>
			<div className='lg:pr-8'>
				{categories.map((cat) => (
					<SubSection
						key={cat}
						title={cat}>
						<List>
							{subs
								.find((s) => s.category === cat)
								?.subs.map((sub) =>
									pathways
										.filter(
											(p) => p.category === cat && p.sub === sub
										)
										.map((p) => (
											<li key={p.id}>
												{p.link && typeof p.link == 'string' ?
													<InlineLink
														href={p.link}
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
														<span className='block pl-6'>
															{p.description}
														</span>
													</>
												)}
											</li>
										))
								)}
						</List>
					</SubSection>
				))}
			</div>
		</Section>
	)
}
