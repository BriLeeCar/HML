import RichText from '@/components/RichText'
import { Section, SectionHeading } from '@/components/Structure/Section'
import type { ToggleListBlock } from '@/payload-types'
import { ToggleListItem } from '../ToggleListItemBlock/Component'

export const ToggleList = ({ ...props }: ToggleListBlock) => {
	return props.items && props.items.length > 0 ?
			<Section>
				<ToggleTitle {...props} />

				{props.items.map(c => (
					<ToggleListItem
						key={c.id}
						{...c}
					/>
				))}
			</Section>
		:	<></>
}

const ToggleTitle = ({ ...props }: ToggleListBlock) => {
	return (
		props.title && (
			<SectionHeading>
				<RichText data={props.title} />
			</SectionHeading>
		)
	)
}
