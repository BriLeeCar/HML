import { Button } from '@/admin/_components'
import { Icon } from '~/components'
import { TableCell } from '../../_components/catalyst/client/table'
import type { UserTable } from '../_lib/types'
import { DeleteBtn } from './TableCellsClient'

export const DiscordHandle = ({ handle }: { handle: string }) => {
	return (
		<>
			<span className='text-muted-foreground/50 mr-0.5 text-xs font-light italic'>@</span>
			{handle}
		</>
	)
}

export const HandleCell = ({ user }: UserTable) => {
	return (
		<TableCell>
			{user.discordHandle ?
				<DiscordHandle handle={user.discordHandle} />
			:	null}
		</TableCell>
	)
}

export const EditCell = ({ user }: UserTable) => {
	return (
		<TableCell
			action
			width={'0%'}
			className='flex py-0'>
			<DeleteBtn user={user} />
			<Button
				iconOnly
				href='/admin/users/edit/{user.id}'>
				<Icon
					IconName='EditIcon'
					className='click size-3 text-red-500 hover:text-red-600'
					solid
					data-slot='icon'
				/>
			</Button>
		</TableCell>
	)
}

export const NameCell = ({ user }: UserTable) => {
	return <TableCell className='font-bold'>{user.name}</TableCell>
}

export const DateCell = ({ user }: UserTable) => {
	return (
		<TableCell>
			{new Date(user.created).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})}
		</TableCell>
	)
}

export const TableCellOptions = {
	name: NameCell,
	handle: HandleCell,
	edit: EditCell,
	date: DateCell,
	custom: TableCell,
}
