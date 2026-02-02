import type { CollectionConfig, CollectionSlug, GroupField } from 'payload'

export const RolesSlug = 'roles' as CollectionSlug
const permissionCbs: GroupField['fields'] = [
	{
		name: 'canDelete',
		type: 'checkbox',
	},
	{
		name: 'canCreate',
		type: 'checkbox',
	},
	{
		name: 'canUpdate',
		type: 'checkbox',
	},
]

export const RolesCollection: CollectionConfig = {
	slug: RolesSlug,
	admin: {
		useAsTitle: 'title',
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
			virtual: true,
			admin: {
				components: {
					Field: '@/collections/Roles/AllPermissionsCB',
				},
			},
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
