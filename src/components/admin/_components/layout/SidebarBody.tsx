import { useContext, type ReactNode } from 'react'
import { CurrentPathContext } from './SidebarContext'
import { SidebarSection } from './SidebarSection'
import { SidebarSectionHeading } from './SidebarSectionHeading'

export const SidebarBody = ({ children }: { children: ReactNode }) => {
	const { userRole } = useContext(CurrentPathContext)!

	return (
		<div
			className={
				'flex flex-1 flex-col overflow-y-auto py-4 [&>[data-slot=section]+[data-slot=section]]:mt-8'
			}>
			{children}
			{userRole?.includes(1) && <SidebarAdmin />}
		</div>
	)
}

const SidebarAdmin = () => {
	return (
		<SidebarSection>
			<SidebarSectionHeading>Admin</SidebarSectionHeading>
			{/* <SidebarReceiverItem
				href='/admin/users/add'
				icon='UserPlusIcon-s'>
				Add User
			</SidebarReceiverItem> */}
		</SidebarSection>
	)
}
