import { Select } from '@/admin/_components/select'
import type {
	ChangeEvent,
	Dispatch,
	FocusEvent,
	SetStateAction,
} from 'react'
import {
	Bold,
	Button,
	Fieldset,
	FormField,
	FormRow,
	Input,
	Label,
} from '~/components/index'
import { cn } from '~/lib/cn'
import type { zSocial } from '~/server/api/zod'
import type { User } from './page'

export const ProfileForm = ({
	user,
	setUserAction,
	showNewSocials,
	setShowNewSocials,
	missingSocials,
}: {
	user: User
	setUserAction: Dispatch<SetStateAction<User>>
	showNewSocials: boolean
	setShowNewSocials: Dispatch<SetStateAction<boolean>>
	missingSocials: Array<zSocial>
}) => {
	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement
		const entry =
			target.value.trim() == '' ? null : target.value.trim()

		let updatedSocials = [...user!.socials]

		if (target.dataset.group == 'socials') {
			const socialIndex = user!.socials.findIndex(
				(s) => s.codeName == target.id
			)

			if (socialIndex >= 0) {
				updatedSocials[socialIndex] = {
					...updatedSocials[socialIndex],
					handle: entry ?? '',
				}
			}
			setUserAction({ ...user!, socials: updatedSocials })
			return
		} else if (target.dataset.group == 'socials') {
			handleNewSocialChange(
				e as unknown as ChangeEvent<HTMLSelectElement>
			)
			return
		} else {
			const fieldKey = target.id as keyof Omit<User, 'socials'>
			setUserAction({
				...user!,
				[fieldKey]: target.value.toString(),
				socials: updatedSocials,
			})
		}
	}

	const handleNewSocialChange = (
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const selected = e.target.value
		if (selected === '') return

		const socialToAdd = missingSocials.find(
			(s) => s.codeName == selected
		)
		if (!socialToAdd) return

		const newSocial = {
			handle: '',
			...socialToAdd,
		}

		setUserAction({
			...user!,
			socials: [...user!.socials, newSocial],
		})

		setShowNewSocials(false)
	}

	return (
		user && (
			<form className={cn('my-4', '*:[label]:font-semibold')}>
				<Fieldset
					legend={'Account Settings'}
					desc="These settings can't be changed without contacting the HML team.">
					<FormField>
						<Label htmlFor='name'>Username</Label>
						<Input
							autoComplete='username'
							id='name'
							type='text'
							defaultValue={user?.name ?? ''}
							disabled
							onBlur={handleBlur}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='email'>Email</Label>
						<Input
							autoComplete='email'
							id='email'
							type='email'
							defaultValue={user?.email ?? ''}
							onBlur={handleBlur}
						/>
					</FormField>
				</Fieldset>
				<Fieldset
					legend={'Public Profile'}
					desc={
						<>
							<Bold>These entries are public.</Bold> Anytime you are
							referenced with HML, this is the information we will
							use.
						</>
					}>
					<FormRow>
						<FormField>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								autoComplete='given-name'
								id='firstName'
								type='text'
								defaultValue={user?.firstName ?? ''}
								onBlur={handleBlur}
							/>
						</FormField>
						<FormField>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								autoComplete='family-name'
								id='lastName'
								type='text'
								defaultValue={user?.lastName ?? ''}
								onBlur={handleBlur}
							/>
						</FormField>
					</FormRow>
					{missingSocials.length > 0 && (
						<Button
							type='button'
							variant='muted'
							className='w-max py-2'
							onClick={() => {
								setShowNewSocials(true)
							}}>
							Add New Social
						</Button>
					)}
					{showNewSocials && (
						<FormField>
							<Select
								onChange={handleNewSocialChange}
								defaultValue=''>
								<option value=''>Select a Social Platform</option>
								{missingSocials.map((social) => (
									<option
										key={social.codeName}
										value={social.codeName}>
										{social.name}
									</option>
								))}
							</Select>
						</FormField>
					)}
					{user.socials.map((s) => {
						const textInputFormat = {
							before: s.profileEntryFormat.split('[HANDLE]')[0],
							after: s.profileEntryFormat.split('[HANDLE]')[1],
						}

						return (
							<FormField key={s.codeName}>
								<Label htmlFor={s.codeName}>{s.name}</Label>
								<Input
									data-group='socials'
									autoComplete={s.codeName}
									id={s.codeName}
									type='text'
									text={textInputFormat}
									defaultValue={s.handle}
									onBlur={handleBlur}
								/>
							</FormField>
						)
					})}
					{/* <FormField>
						<Label htmlFor='tikTok'>TikTok</Label>
						<Input
							autoComplete='tikTok'
							id='tikTok'
							type='text'
							text={{ before: '@ ' }}
							defaultValue={
								user?.socials.find((x) => x.name == 'TikTok')?.handle
								?? ''
							}
							onBlur={handleBlur}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='blueSky'>Blue Sky</Label>
						<Input
							autoComplete='blueSky'
							id='blueSky'
							type='text'
							text={{ after: '.bsky.social' }}
							defaultValue={
								user?.socials.find((x) => x.name == 'Blue Sky')
									?.handle ?? ''
							}
							onBlur={handleBlur}
						/>
					</FormField> */}
				</Fieldset>
			</form>
		)
	)
}
