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
		// @ts-expect-error TS2345
		new Set(pathways.map((p) => p.category))
	)
	const subs =
		categories.map((cat) => {
			return {
				category: cat,
				subs: Array.from(
					new Set(
						pathways // @ts-expect-error TS2345
							.filter((p) => p.category === cat) // @ts-expect-error TS2345
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
				{categories.map((cat, i) => (
					<SubSection
						key={i}
						title={cat}>
						<List>
							{subs
								.find((s) => s.category === cat)
								?.subs.map((sub) =>
									pathways
										.filter(
											// @ts-expect-error TS2345
											(p) => p.category === cat && p.sub === sub
										)
										.map((p) => (
											<li key={p.id}>
												{(
													p.official_link
													&& typeof p.official_link == 'string'
												) ?
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
