export type Res = {
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

export type Role = {
	label: string
	key: string
}

export type User = {
	name: string
	id: string
	role: Role
}
