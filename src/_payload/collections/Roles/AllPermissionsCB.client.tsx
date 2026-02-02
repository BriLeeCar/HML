'use client'

import { CheckboxInput, useField } from '@payloadcms/ui'

const AllPermissionsCBClient = ({ ...props }) => {
	const { setValue } = useField({ path: props.path })
	const isChecked = props.value as boolean

	return (
		<CheckboxInput
			label={'All Permissions'}
			onToggle={e => {
				const val = e.target.checked
				const cbFields = [...document.querySelectorAll('.field-type.checkbox')]
				cbFields.forEach(wrapper => {
					const input = wrapper.querySelector(
						'#field-permission input[type="checkbox"]'
					) as HTMLInputElement
					if (input !== e.target) {
						if (input.checked != val) {
							input.click()
						}
					}
					setValue(val)
				})
			}}
			checked={isChecked}
		/>
	)
}

export default AllPermissionsCBClient
