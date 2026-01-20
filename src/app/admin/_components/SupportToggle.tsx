'use client'

import { useContext, useState } from 'react'
import { api } from '~/lib'
import { UserRoleContext } from '../_providers/RoleContext'
import { Switch } from './catalyst'
import { LayoutWrapper } from './client/Wrapper'

export const SupportToggle = ({ status }: { status: string }) => {
	const [toggleStatus, setToggleStatus] = useState(status)
	const { roles } = useContext(UserRoleContext)
	const mutation = api.admin.toggleForm.useMutation({
		onSuccess: data => {
			setToggleStatus(data.value)
		},
	})

	const handleClick = async () => {
		mutation.mutate(toggleStatus == 'on' ? 'off' : 'on')
	}

	const isOn = toggleStatus == 'on'

	return (
		roles.includes('admin') && (
			<LayoutWrapper
				title='Support Form Toggle'
				subtitle={
					<span className='relative flex items-center'>
						Support Form Active:
						<Switch
							color='green'
							className='ml-4'
							defaultChecked={isOn}
							onChange={async () => await handleClick()}
						/>
					</span>
				}>
				<></>
			</LayoutWrapper>
		)
	)
}
