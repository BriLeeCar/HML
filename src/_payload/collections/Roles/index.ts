import type { CollectionConfig, CollectionSlug, GroupField } from 'payload'

export const RolesSlug = 'roles' as CollectionSlug

const basePermissions = ['canDelete', 'canPublish', 'canCreate', 'canUpdate'] as const

const permissionCbs: GroupField['fields'] = basePermissions.map(p => ({
	name: p,
	type: 'checkbox',
}))

const permissionFields = (name: string): GroupField => ({
	name,
	type: 'group',
	fields: permissionCbs,
	admin: {
		components: {
			Label: '@/components/FieldLabel/Large',
		},
		className:
			'*:*:[.render-fields]:flex *:*:[.render-fields]:flex-row *:*:[.render-fields]:flex-wrap',
	},
})

export const RolesCollection: CollectionConfig = {
	slug: RolesSlug,
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'description'],
		group: 'General',
		hideAPIURL: true,
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
				disableListColumn: true,
				description:
					'If checked, this role will have all permissions. This is automatically managed based on individual permissions.',
				components: {
					Field: '@/collections/Roles/AllPermissionsCB',
				},
			},
		},
		{
			name: 'permission',
			label: 'Base Permissions',
			type: 'group',
			fields: [
				permissionFields('users'),
				permissionFields('pages'),
				permissionFields('pathways'),
				permissionFields('settings'),
				permissionFields('resources'),
			],
		},
	],
}
