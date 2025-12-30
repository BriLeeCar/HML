'use client'

import { Background } from './_components/Background'
import { Collaboration } from './_components/Collaboration'
import type { User } from './page'

export const JoinBase = ({ applicant }: { applicant: User }) => {
	const role = {
		label: 'Programming',
		key: 'programming',
	}
	return (
		<>
			<Background
				name={applicant.name}
				role={role}
			/>
			<Collaboration />
		</>
	)
}
