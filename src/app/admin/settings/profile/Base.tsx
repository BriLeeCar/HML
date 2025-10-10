'use client'

import { useMemo, useState } from 'react'
import { useToast } from '~/components/Admin/Toast'
import {
	Page,
	PageHeading,
	Section,
	SectionHeading,
} from '~/components/index'
import type { zSocial } from '~/server/api/zod'
import { api } from '~/trpc/react'
import { Buttons } from './Buttons'
import { ProfileForm } from './Form'
import type { User } from './page'

export const ProfileBase = ({
	data,
	missingSocials,
}: {
	data: User
	missingSocials: Array<zSocial>
}) => {
	const [user, setUser] = useState<User | null>(data)
	const [showNewSocials, setShowNewSocials] = useState(false)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const missing = useMemo(() => missingSocials, [user?.socials])
	const Toast = useToast()

	const saveData = api.user.updateUserProfile.useMutation({
		onSuccess: () =>
			Toast.fireToast({
				title: 'Success!',
				body: 'Your profile has been updated.',
				status: 'success',
			}),
		onError: () =>
			Toast.fireToast({
				title: 'Error',
				body: 'There was an issue updating your profile. Please try again.',
				status: 'error',
			}),
	})

	const handleSave = () => {
		if (!user) return
		saveData.mutate(user, {
			onError: (error) => {
				console.error('Error saving user data:', error)
			},
		})
	}

	const handleCancel = () => {
		if (data) {
			document.forms[0].reset()
			setUser(data)
		}
	}

	return (
		<Page>
			<PageHeading
				subtitle={
					<>
						Welcome back {user?.name}! Your profile has the following
						settings attached to it. If you need to update a disabled
						setting, let the HML team know!
					</>
				}>
				{user?.name}
			</PageHeading>
			<Buttons
				handleCancelAction={handleCancel}
				handleSaveAction={handleSave}
			/>

			<Section>
				<SectionHeading eyebrow='Profile Basics'>
					All About You!
				</SectionHeading>
				<ProfileForm
					user={user}
					setUserAction={setUser}
					showNewSocials={showNewSocials}
					setShowNewSocials={setShowNewSocials}
					missingSocials={missing}
				/>
			</Section>
			<Toast.El />
		</Page>
	)
}
