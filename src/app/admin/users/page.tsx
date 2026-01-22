import { api } from '~/serverQuery'
import { Section, SectionHeading } from '../_components'
import { Table } from '../_components/catalyst/client/table'
import { LayoutWrapper } from '../_components/client'
import { TableDetails } from './_components/Table'

const UserPage = async ({ searchParams }: PageProps<'/admin/users'>) => {
	const { page } = await searchParams

	const { users, pendingUsers, totalPages, userCount } = await api.user.getUsers(
		parseInt(page as string) || 1
	)

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
						rows={users}
						columns={[
							'edit',
							'name',
							'handle',
							'date',
							{
								key: 'array',
								label: 'Roles',
								// @ts-expect-error mistyped
								fn: user => user.roles.join(', '),
							},
						]}
					/>
				</Table>
				<div>
					Page {page || 1} of {totalPages} | Total Users: {userCount}
				</div>
			</Section>
		</LayoutWrapper>
	)
}

export default UserPage
