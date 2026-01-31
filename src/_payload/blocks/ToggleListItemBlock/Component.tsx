import RichText from '@/components/RichText'
import { Subsection, SubsectionContent, SubsectionHeading } from '@/components/Structure/Subsection'
import type { ToggleListItemBlock } from '@/payload-types'

export const ToggleListItem = ({ ...props }: ToggleListItemBlock) => {
	return (
		<Subsection
			defaultOpen={false}
			type='grey'>
			<SubsectionHeading>
				<span className='flex items-start justify-start gap-4 text-start'>
					<span>Q:</span>
					{props.title}
				</span>
			</SubsectionHeading>
			<SubsectionContent>
				<RichText data={props.content} />
			</SubsectionContent>
		</Subsection>
	)
}
