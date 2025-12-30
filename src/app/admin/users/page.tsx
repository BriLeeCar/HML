import { api } from '~/serverQuery'
import { Section, SectionHeading } from '../_components'
import { Table } from '../_components/catalyst/client/table'
import { LayoutWrapper } from '../_components/client'
import { TableDetails } from './_components/Table'

const UserPage = async () => {
	const users = await api.user.getUsers()
	const grouped = Object.groupBy(users, user => (user.key == null ? 'Active' : 'Pending'))

	const pendingUsers = grouped['Pending']?.toSorted((a, b) => a.name.localeCompare(b.name)) || []

	const activeUsers = grouped['Active']?.toSorted((a, b) => a.name.localeCompare(b.name)) || []

	return (
		<LayoutWrapper title={'Current Users'}>
			<Section gap='sm'>
				<SectionHeading>Pending Users</SectionHeading>
				<Table
					dense
					className='mx-auto w-max self-center'>
					<TableDetails
						rows={pendingUsers}
						columns={['edit', 'name', 'date']}
					/>
				</Table>
			</Section>
			<Section gap='sm'>
				<SectionHeading>Active Users</SectionHeading>
				<Table dense>
					<TableDetails
						rows={activeUsers}
						columns={['edit', 'name', 'handle', 'date']}
					/>
				</Table>
			</Section>
		</LayoutWrapper>
	)
}

export default UserPage
