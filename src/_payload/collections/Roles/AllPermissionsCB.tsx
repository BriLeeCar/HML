import AllPermissionsCBClient from './AllPermissionsCB.client'

const AllPermissionsCB = ({ ...props }) => {
	console.log(Object.keys(props)) // Debugging line to check props

	const isChecked = Object.values(props.siblingData.permission).every(ea =>
		Object.values(ea as { [key: string]: boolean }).every(v => v === true)
	)

	return (
		<AllPermissionsCBClient
			path={props.path}
			value={isChecked}
		/>
	)
}

export default AllPermissionsCB
