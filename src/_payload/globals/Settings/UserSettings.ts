import type { TabAsField } from 'payload'

export const UserSettings: TabAsField = {
	label: 'User Settings',
	type: 'tab',
	name: 'userSettings',
	fields: [
		{
			type: 'group',
			fields: [
				{
					name: 'defaultUserRole',
					type: 'relationship',
					virtual: true,
					relationTo: 'roles',
					label: 'Default User Role',
				},
				{
					name: 'defaultUserTeam',
					type: 'select',
					label: 'Default User Team',
					options: [],
				},
			],
		},
	],
}
