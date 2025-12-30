import {
	FormSection,
	FormSectionDetails,
	FormSectionLegend,
} from '@/admin/_components/_form/clientFieldset'

import { Field, Label, Textarea } from '@/admin/_components/catalyst'
import { CommunicationPref } from './CommunicationPref'
import { ExperienceLevelNonProfits } from './ExperienceLevelNonProfits'

const Blocked = () => {
	return (
		<Field>
			<Label required>
				If you’re blocked or unsure about a requirement, how do you typically ask for help or
				clarification?
			</Label>
			<Textarea name='blocked_communication' />
		</Field>
	)
}

const Contribution = ({ ...props }) => {
	return (
		<Field {...props}>
			<Label required>What are you hoping to get out of contributing to HML?</Label>
			<Textarea name='contribution_goal' />
		</Field>
	)
}

export const Collaboration = () => {
	return (
		<FormSection aria-label='Collaboration Check'>
			<FormSectionLegend description='We understand that we all communicate differently, and we want to ensure that our collaboration methods.'>
				Collaboration
			</FormSectionLegend>
			<FormSectionDetails className='grid-cols-1 gap-x-8'>
				<Contribution className='col-span-full' />
				<Blocked />
				<CommunicationPref />
				<ExperienceLevelNonProfits />
			</FormSectionDetails>
		</FormSection>
	)
}
