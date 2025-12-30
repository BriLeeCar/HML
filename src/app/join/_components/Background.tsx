import {
	FormSection,
	FormSectionDetails,
	FormSectionLegend,
} from '@/admin/_components/_form/clientFieldset'
import { Description, Field, Input, Label, Textarea } from '@/admin/_components/catalyst'
import type { User } from '../fetchData'
import { FieldName } from './FieldName'
import { FieldRole } from './FieldRole'

const ExperienceLevel = ({
	role,
	...props
}: Omit<Props<typeof Field>, 'role'> & { role: User['role'] }) => {
	return (
		<Field {...props}>
			<Label required>
				What’s your current experience level with {role.key} (self-taught, student, junior level,
				etc.)?
			</Label>
			<Description>
				Being self-taught or a student is perfectly fine. We just want to know where you're at.
			</Description>
			<Textarea name='experience_level' />
		</Field>
	)
}

const PortfolioLink = ({ ...props }: Props) => {
	return (
		<Field {...props}>
			<Label required>Portfolio Link</Label>
			<Description>
				If you have a portfolio or examples of your previous work, please provide a link below.
			</Description>
			<Input name='portfolio_link' />
		</Field>
	)
}

export const Background = ({ name, role }: { name: string; role: User['role'] }) => {
	return (
		<FormSection
			title='Basic Information'
			aria-label='Basic Information'>
			<FormSectionLegend description='Please fill in your basic information so that we may properly match your original application with this assessment'>
				Overview
			</FormSectionLegend>
			<FormSectionDetails className='grid-cols-2 gap-x-8'>
				<FieldName name={name} />
				<FieldRole role={role} />
				<PortfolioLink className='col-span-full' />
				<Field className='flex-1'>
					<Label required>Timezone</Label>
					<Input name='timezone' />
				</Field>
				<Field className='flex-1'>
					<Label required>Discord Handle</Label>
					<Input name='discord' />
				</Field>
				<ExperienceLevel
					role={role}
					className='col-span-full'
				/>
			</FormSectionDetails>
		</FormSection>
	)
}
