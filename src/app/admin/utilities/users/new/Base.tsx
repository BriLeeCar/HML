'use client'

import { Button } from '@/admin/_components/Button'
import { Field, Input, InputGroup, Label, Select, Strong } from '@/admin/_components/catalyst'
import { Form } from '@/admin/_components/Form'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { Icon } from '~/components'
import { api, type RouterOutputs } from '~/lib/api'
import { cn } from '~/lib/cn'
import { toTitleCase } from '~/lib/text'
import { useToast } from '../../../../../hooks/useToast'

type NewUserData = RouterOutputs['user']['createUserKey']

export const NewUserForm = ({ roles }: { roles: Queried.User.Role[] }) => {
	const Toaster = useToast()
	const { mutate } = api.user.createUserKey.useMutation({
		onSuccess: data => {
			window.scrollTo(0, 0)
			Toaster.fireToast({
				title: 'User Key created successfully!',
				status: 'success',
				body: `You have successfully created the user key for: ${data.name}`,
			})
			setData({
				...data,
				success: true,
			})
		},
		onError: () => {
			window.scrollTo(0, 0)
			Toaster.fireToast({
				status: 'error',
				body: `There was an error creating the user key. Please try again.`,
			})
			setData({
				name: '',
				key: '',
				roleId: 0,
				success: false,
			})
		},
	})

	const [data, setData] = useState<Omit<NewUserData, 'userId'> & { success: boolean }>({
		name: '',
		roleId: 0,
		key: '',
		success: false,
	})

	return (
		<>
			<Form className='grid max-w-sm grid-cols-1 items-baseline gap-y-6'>
				<Toaster.El />
				<FormField
					icon='UserCircleIcon'
					label='Username'
					name='username'
					labelProps={{
						htmlFor: 'username',
					}}>
					<Input
						type='text'
						id='username'
						name='username'
						autoComplete='off'
						onBlur={e =>
							setData({
								...data,
								name: e.currentTarget.value,
							})
						}
						required
					/>
				</FormField>
				<FormField
					icon='AlertTriangleIcon'
					label='Role'
					name='roleId'>
					<Select
						required
						aria-label='User Role'
						onChange={e => setData({ ...data, roleId: parseInt(e.currentTarget.value) })}
						placeholder={{ value: 0, label: 'Select a role', selected: data.roleId == 0 }}>
						{roles.map(role => (
							<option
								key={role.id}
								value={role.id}>
								{toTitleCase(role.name)}
							</option>
						))}
					</Select>
				</FormField>
				<Button
					className='mt-8'
					type='button'
					onClick={() => mutate({ name: data.name, roleId: Number(data.roleId) })}>
					Create User Key
				</Button>
			</Form>
			<AnimatePresence>
				{data.success && (
					<motion.div
						initial={{
							opacity: 0,
							translateX: -20,
						}}
						animate={{
							opacity: 1,
							translateX: 0,
						}}
						className='bg-foreground/5 border-border/2 text-muted-foreground dark:bg-foreground/10 hover:text-foreground mx-auto mt-8 grid w-fit max-w-md grid-cols-[auto_auto_.15fr] gap-x-4 rounded-lg border px-8 py-4 transition-all dark:shadow-none'>
						<Strong className='row-start-1 text-end font-bold'>Name:</Strong>{' '}
						<span>{data.name}</span>
						<Strong className='col-start-1 row-start-2 text-end font-bold'>Key:</Strong>{' '}
						<span className='col-start-2 row-start-2'>{data.key}</span>
						<Icon
							IconName='ClipboardIcon'
							className='hover:text-foreground/70 col-start-3 row-span-2 row-start-1 ml-4 inline size-6 cursor-pointer self-center align-middle opacity-50 transition-all hover:opacity-100 active:scale-85'
							onClick={() => {
								navigator.clipboard.writeText(data.key)
								Toaster.fireToast({
									title: 'Copied to clipboard',
									status: 'info',
									body: `The user key has been copied to your clipboard.`,
								})
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

const FormField = ({
	...props
}: {
	label: ReactNode
	children: ReactNode
	name: string
	labelProps?: Props<typeof Label>
	fieldProps?: Props<typeof Field>
	icon?: IconKey
}) => {
	return (
		<Field
			{...props.fieldProps}
			className={cn(
				'grid grid-cols-[1fr_3fr] items-baseline gap-x-8',
				'[&>span:has(select)>svg]:hidden',
				'[&>[data-slot=label]+[data-slot=control]]:mt-0',
				props.fieldProps?.className
			)}>
			<Label
				{...props.labelProps}
				className={cn('text-end', props.labelProps?.className)}
				required>
				{props.label}
			</Label>
			{props.icon ?
				<InputGroup>
					<Icon
						IconName={props.icon}
						data-slot='icon'
					/>
					{props.children}
				</InputGroup>
			:	props.children}
		</Field>
	)
}
