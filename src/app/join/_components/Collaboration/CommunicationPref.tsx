'use client'

import { Description, Field, Input, Label, Select } from '@/admin/_components/catalyst'
import { useState } from 'react'

export const CommunicationPref = () => {
	const [other, setOther] = useState(false)

	return (
		<>
			<Field>
				<Label required>How do you prefer to communicate?</Label>
				<Description>
					Not just for the assessment, but in general when working on projects.
				</Description>
				<Select
					name='communication_preference'
					onChange={e => {
						if (other && e.currentTarget.value != 'other') {
							setOther(false)
						} else if (!other && e.currentTarget.value == 'other') {
							setOther(true)
						}
					}}>
					<option value='discord'>Discord/Chat Messaging</option>
					<option value='email'>Email</option>
					<option value='video'>Video Calls</option>
					<option value='other'>Other</option>
				</Select>
			</Field>
			{other && (
				<Field>
					<Label required>Please specify your preferred communication method</Label>
					<Input name='communication_preference_other' />
				</Field>
			)}
		</>
	)
}
