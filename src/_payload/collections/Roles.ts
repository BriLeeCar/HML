import type { CollectionConfig, CollectionSlug, GroupField } from 'payload'

export const RolesSlug = 'roles' as CollectionSlug
const permissionCbs: GroupField['fields'] = [
	{
		name: 'canDelete',
		type: 'checkbox',
		defaultValue: false,
	},
	{
		name: 'canCreate',
		type: 'checkbox',
		defaultValue: false,
	},
	{
		name: 'canUpdate',
		type: 'checkbox',
		defaultValue: false,
	},
]

const RolesCollection: CollectionConfig = {
	slug: RolesSlug,
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'description'],
		group: undefined,
	},
	custom: {
		parent: 'teams',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			unique: true,
		},
		{
			name: 'description',
			type: 'textarea',
		},
		{
			type: 'checkbox',
			name: 'allPermissions',
			label: 'All Permissions',
		},
		{
			name: 'permission',
			type: 'group',
			fields: [
				{
					type: 'group',
					name: 'users',
					admin: {
						className: '*:*:[.render-fields]:flex *:*:[.render-fields]:flex-col',
					},
					fields: permissionCbs,
				},
				{
					type: 'group',
					name: 'pages',
					admin: {
						className: '*:*:[.render-fields]:flex *:*:[.render-fields]:flex-col',
					},
					fields: [
						...permissionCbs,
						{
							name: 'canPublish',
							type: 'checkbox',
							defaultValue: false,
						},
					],
				},
				{
					type: 'group',
					name: 'pathways',
					fields: permissionCbs,
					admin: {
						className: '*:*:[.render-fields]:flex *:*:[.render-fields]:flex-col',
					},
				},
				{
					type: 'group',
					name: 'settings',
					fields: permissionCbs,
					admin: {
						className: '*:*:[.render-fields]:flex *:*:[.render-fields]:flex-col',
					},
				},
				{
					type: 'group',
					name: 'resources',
					fields: permissionCbs,
					admin: {
						className: '*:*:[.render-fields]:flex *:*:[.render-fields]:flex-col',
					},
				},
			],
		},
	],
}

export default RolesCollection
