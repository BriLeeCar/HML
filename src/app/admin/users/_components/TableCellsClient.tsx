'use client'
import { Bold, Button } from '@/admin/_components'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/admin/_components/catalyst'
import { useState } from 'react'
import { Icon } from '~/components'
import type { UserTable } from '../_lib/types'

export const DeleteBtn = ({ user }: UserTable) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				iconOnly
				onClick={() => setOpen(true)}>
				<Icon
					IconName='TrashXIcon'
					className='click size-3 text-red-500 hover:text-red-600'
					solid
					data-slot='icon'
				/>
			</Button>
			<Alert
				size='sm'
				type='danger'
				open={open}
				onClose={setOpen}>
				<AlertTitle>Are you sure?</AlertTitle>
				<AlertDescription>
					This will permanently remove <Bold>{user.name}</Bold> from the system and cannot be
					undone.
				</AlertDescription>
				<AlertActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button
						data-type='danger'
						onClick={() => setOpen(false)}>
						Delete
					</Button>
				</AlertActions>
			</Alert>
		</>
	)
}
