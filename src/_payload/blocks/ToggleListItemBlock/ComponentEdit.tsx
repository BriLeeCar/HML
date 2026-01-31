import { SubsectionHeading } from '@/components/Structure/Subsection'
import type { TextFieldServerProps } from 'payload'
import { useState } from 'react'
import { ToggleListItem } from './Component'

const ToggleListItemEdit = ({ ...props }: TextFieldServerProps) => {
	return (
		<ToggleListItem
			title={props.data['title']}
			content={props.data['content']}
			blockType={'toggle-list-item'}
		/>
	)
}

const TitleField = () => {
	const [field, setField] = useState('')
	return (
		<SubsectionHeading>
			<span className='flex items-start justify-start gap-4 text-start'>
				<span>Q:</span>
				<span contentEditable={true} />
			</span>
		</SubsectionHeading>
	)
}
