import { api } from 'query'
import { Icon } from '~/components/Icon'
import type { RouterOutputs } from '~/lib/api'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../_components/catalyst/client/table'

const UserPage = async () => {
	const users = await api.user.getUsers()

	const grouped = Object.groupBy(users, user => (user.userId == null ? 'Pending' : 'Active'))

	return Object.keys(grouped).map(k => {
		const key = k as keyof typeof grouped
		return (
			<Table key={k}>
				<TableHead>
					<TableRow>
						<TableHeader></TableHeader>
						<TableHeader>Name</TableHeader>
						<TableHeader>Handle</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{grouped[key]?.map(user => (
						<UserRow
							key={user.userId}
							user={user}
						/>
					))}
				</TableBody>
			</Table>
		)
	})
}

const UserRow = ({ user }: { user: RouterOutputs['user']['getUsers'][number] }) => {
	return (
		<TableRow key={user.userId}>
			<TableCell width={'0%'}>
				<span className='flex gap-2'>
					<Icon
						IconName='TrashXIcon'
						className='click size-3 text-red-500 hover:text-red-600'
						solid
					/>
					<Icon
						IconName='EditIcon'
						className='click size-3 text-red-500 hover:text-red-600'
						solid
					/>
				</span>
			</TableCell>
			<TableCell
				className='font-bold'
				width={'100%'}>
				{user.name}
			</TableCell>
			<TableCell width={'full'}>
				{user.user?.discordHandle ?
					<DiscordHandle handle={user.user.discordHandle} />
				:	null}
			</TableCell>
		</TableRow>
	)
}

const DiscordHandle = ({ handle }: { handle: string }) => {
	return (
		<>
			<span className='text-muted-foreground/50 mr-0.5 text-xs font-light italic'>@</span>
			{handle}
		</>
	)
}

export default UserPage
