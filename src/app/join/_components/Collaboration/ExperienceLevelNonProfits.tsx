'use client'

import { SubSectionFieldset } from '@/admin/_components'
import {
	Description,
	Field,
	Label,
	Radio,
	RadioField,
	RadioGroup,
	Textarea,
} from '@/admin/_components/catalyst'
import { useState } from 'react'

export const ExperienceLevelNonProfits = () => {
	const [volunteerExperience, setVolunteerExperience] = useState(false)

	return (
		<>
			<SubSectionFieldset className='group group-subsection'>
				<SubSectionFieldset.Legend>Volunteer Experience</SubSectionFieldset.Legend>
				<SubSectionFieldset.Details>
					<Field as='fieldset'>
						<Label
							as='legend'
							required>
							Do you have experience working with non-profits or other volunteer based projects?
						</Label>
						<RadioGroup
							name='has_volunteer_experience'
							onChange={e => {
								if (e == 'Yes' && !volunteerExperience) {
									setVolunteerExperience(true)
								} else if (e == 'No' && volunteerExperience) {
									setVolunteerExperience(false)
								}
							}}
							aria-required='true'
							aria-label='has_volunteer_experience'>
							<RadioField data-value='Yes'>
								<Radio
									color='brand'
									value={'Yes'}
								/>
								<Label>Yes</Label>
							</RadioField>
							<RadioField data-value='No'>
								<Radio
									color='brand'
									value={'No'}
								/>
								<Label>No</Label>
							</RadioField>
						</RadioGroup>
					</Field>
					{volunteerExperience && (
						<Field>
							<Label>Tell us about your experience</Label>
							<Description>
								<span className='mb-4 block text-xs italic'>
									Please feel free to omit any details that may identify specific organizations or
									individuals you've worked with if you prefer to keep that information private.
								</span>
								What types of non-profits or volunteer projects have you worked with? What roles did
								you fulfill?
							</Description>
							<Textarea name='volunteer_experience' />
						</Field>
					)}
				</SubSectionFieldset.Details>
			</SubSectionFieldset>
		</>
	)
}
