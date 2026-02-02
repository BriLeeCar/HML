import RichText from '@/components/RichText'
import { Section, SectionHeading } from '@/components/Structure/Section'
import type { ToggleListBlock } from '@/payload-types'
import { ToggleListItemComponent } from '../ToggleListItemBlock'

export const ToggleListComponent = ({ ...props }: ToggleListBlock) => {
	return props.items && props.items.length > 0 ?
			<Section>
				<ToggleTitle {...props} />

				{props.items.map(c => (
					<ToggleListItemComponent
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
