'use client'

import { Button, Form, FormError } from '@/admin/_components'
import { Field, Input, InputGroup } from '@/admin/_components/catalyst'
import { Fragment, useState, type FocusEvent, type MouseEvent } from 'react'
import z from 'zod'
import { api } from '~/clientQuery'
import { Icon, Section, SectionHeading } from '~/components'
import { useToast, type ToastMessage } from '~/hooks/useToast'
import { cn } from '~/lib/cn'
import type { User } from '~/server/prisma/generated'
import { CheckSecretInput } from './_components/CheckSecretInput'
import { ThisLabelEl } from './_components/LabelEl'
import { ThisSection } from './_components/SectionHeading'

export const AdminUsersSettingsBase = ({ user }: { user: User }) => {
	const toaster = useToast()

	// const { mutate } = api.user.updateUser.useMutation({
	// 	onSuccess: () => {
	// 		// Handle success (e.g., show a success message)
	// 	},
	// 	onError: () => {
	// 		// Handle error (e.g., show an error message)
	// 	},
	// })

	const [userData, setUserData] = useState<User>(user)

	const canSave = user && user == userData ? false : true
	const handleToaster = ({ ...props }: ToastMessage) => {
		toaster.fireToast({ ...props })
	}

	return (
		<Fragment>
			<toaster.El />
			<ThisSection
				label='Password'
				className='max-sm:page-full *:first:px-6'>
				<Password
					handleToaster={handleToaster}
					userId={user.id}
				/>
			</ThisSection>

			<Section>
				<SectionHeading>Basics</SectionHeading>
				<ThisFormEl>
					<Field>
						<ThisLabelEl>Username</ThisLabelEl>
						<InputGroup>
							<Icon
								IconName='UserCircleIcon'
								data-slot='icon'
							/>
							<Input
								type='text'
								name='name'
								autoComplete='username'
								defaultValue={userData.name}
								onChange={e => setUserData({ ...userData, name: e.target.value })}
							/>
						</InputGroup>
					</Field>
					<Field>
						<ThisLabelEl>E-Mail</ThisLabelEl>
						<InputGroup>
							<Icon
								IconName='EnvelopeIcon'
								data-slot='icon'
							/>
							<Input
								type='text'
								name='email'
								autoComplete='email'
								defaultValue={userData.email ?? undefined}
							/>
						</InputGroup>
					</Field>
					<Button
						className='mt-3'
						type='button'
						disabled={!canSave ? true : false}
						onClick={() => {}}>
						Save Changes
					</Button>
				</ThisFormEl>
			</Section>
		</Fragment>
	)
}

type SecretKeys = 'newSecret1' | 'newSecret2'
type SecretState = {
	[key in SecretKeys]?: {
		value: string | undefined
		message: Array<string>
	}
} & {
	message: string[]
	canEditSecret: boolean
}

function Password({
	handleToaster,
	userId,
}: {
	userId: string
	handleToaster: ({ title, status, body }: ToastMessage) => void
}) {
	const { mutate } = api.user.updateSecret.useMutation({
		onSuccess: () => {
			handleToaster({
				title: 'Password updated successfully!',
				status: 'success',
				body: 'Your password has been updated.',
			})
		},
		onError: () => {
			// Handle error (e.g., show an error message)
		},
	})

	const [secrets, setSecrets] = useState<SecretState>({
		newSecret1: {
			value: undefined,
			message: [],
		},
		newSecret2: {
			value: undefined,
			message: [],
		},
		message: [],
		canEditSecret: false,
	})

	const handleSecretCheck = (e: boolean) => {
		const data = { ...secrets }
		data.canEditSecret = e
		if (e == false) {
			data.newSecret1 = { value: undefined, message: [] }
			data.newSecret2 = { value: undefined, message: [] }
			data.message = []
		}
		setSecrets(data)
	}

	const handleSecretChange = (e: FocusEvent<HTMLInputElement>) => {
		const { value, name } = e.target as {
			value: string
			name: SecretKeys
		}

		const otherKey = Object.keys(secrets).find(k => {
			return [name, 'message', 'canEditSecret'].includes(k) ? false : true
		}) as SecretKeys

		const newData = {
			...secrets,
		}

		const parsed = z.string().min(8, 'Password must be at least 8 characters long').safeParse(value)

		if (parsed.error) {
			Object.assign(newData, {
				[name]: {
					...newData[name],
					message: parsed.error.issues.map(m => m.message),
				},
			})
		} else if (newData[otherKey]?.value != value) {
			newData.message = [...(newData.message ?? []), 'Passwords do not match']
		} else {
			newData.message = []
			newData[name] = {
				value: value,
				message: [],
			}
		}

		setSecrets(newData)
	}

	const canSubmit =
		secrets.newSecret1
		&& secrets.newSecret2
		&& secrets.newSecret1.value === secrets.newSecret2.value
		&& secrets.canEditSecret

	return (
		<ThisFormEl className='page-auto'>
			<input
				type='text'
				name='username'
				autoComplete='username'
				className='sr-only'
			/>
			<CheckSecretInput
				handleSecretCheck={handleSecretCheck}
				userId={userId}
			/>

			<div className='space-y-3'>
				<Field
					className='col-span-1'
					disabled={secrets.canEditSecret == false}>
					<ThisLabelEl>New Password</ThisLabelEl>
					<InputGroup>
						<Icon
							IconName='KeyIcon'
							data-slot='icon'
						/>
						<Input
							type='password'
							name='newSecret1'
							autoComplete='new-password'
							onBlur={handleSecretChange}
						/>
						<FormError message={secrets.newSecret1?.message} />
					</InputGroup>
				</Field>
				<Field
					className='basis-1/2'
					disabled={secrets.canEditSecret == false}>
					<ThisLabelEl>Confirm Password</ThisLabelEl>
					<InputGroup>
						<Icon
							IconName='KeyIcon'
							data-slot='icon'
						/>
						<Input
							type='password'
							name='newSecret2'
							autoComplete='new-password'
							onBlur={handleSecretChange}
						/>
					</InputGroup>
				</Field>
			</div>
			<Button
				type='submit'
				className='mt-3'
				disabled={canSubmit == false}
				onClick={(e: MouseEvent<HTMLButtonElement>) => {
					e.preventDefault()
					mutate({
						newSecret: secrets.newSecret1!.value!,
						oldSecret: (e.target as HTMLButtonElement).form?.secret.value,
					})
				}}>
				Update Password
			</Button>
		</ThisFormEl>
	)
}

const ThisFormEl = ({ ...props }: Props<'form'>) => {
	return (
		<Form
			{...props}
			className={cn('grid grid-cols-1 sm:px-8 sm:pt-4', props.className)}
		/>
	)
}
