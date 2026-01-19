type Res = {
	tasks: {
		id: string
		name: string
		custom_fields: {
			id: string
			name: string
			value: number | string | string[]
		}[]
	}[]
	last_page: boolean
}

type Role = {
	label: string
	key: string
}

export type User = {
	name: string
	id: string
	role: Role
}

const roles = {
	'0e5796bb-ace1-4f91-84c1-9220c77d1862': {
		label: 'UI/UX',
		key: 'ux',
	},
	'280fa8de-2da6-4d56-8062-47aa5e79c454': {
		label: 'Designer/UI',
		key: 'ui',
	},
	'920efe5f-d4a8-40c6-98bb-688dd87b9b04': {
		label: 'Programming',
		key: 'dev',
	},
}

export const fetchData = async ({ urlID }: { urlID?: string }) => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'pk_100659109_ZS3SXH8GNP66GWOBVE3YVP6P24DWO7GJ',
		},
	}

	const req = JSON.stringify([
		{
			field_id: '3b6ea219-6d71-42c6-ba08-f2c222d3e70f',
			operator: 'RANGE',
			value: {
				low_value: 0,
				high_value: 2,
			},
		},
	])

	const getRole = (tasks: Res['tasks'][0]) => {
		const roleField = tasks.custom_fields.find(f => f.id == '0d38741b-15a5-4752-8e8c-9edeb1edd3f2')
			?.value as string[]

		return roles[roleField[0] as keyof typeof roles] as Role
	}

	const { tasks } = await fetch(
		`https://api.clickup.com/api/v2/list/901517962888/task?include_markdown_description=false&include_timl=true&custom_fields=${req}`,
		options
	).then(res => res.json())

	const applicants: User[] = []
	if (tasks) {
		for (const task of tasks) {
			applicants.push({
				name: task.name.split(' ')[0],
				id: task.id,
				role: getRole(task),
			})
		}
	}

	if (urlID) {
		return applicants.filter(applicant => applicant.id === urlID)
	}

	return applicants
}
