import AllPermissionsCBClient from './AllPermissionsCB.client'

const AllPermissionsCB = ({ ...props }) => {
	const isChecked = Object.values(props.siblingData.permission).every(ea =>
		Object.values(ea as { [key: string]: boolean }).every(v => v === true)
	)
	console.log(props.req.user)

	return (
		<AllPermissionsCBClient
			path={props.path}
			value={isChecked}
		/>
	)
}

export default AllPermissionsCB
