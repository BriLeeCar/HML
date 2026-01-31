import type { CollectionConfig, CollectionSlug } from 'payload'

export const RolesSlug = 'roles' as CollectionSlug

export const RolesCollection: CollectionConfig = {
	slug: RolesSlug,
	admin: {
		useAsTitle: 'name',
	},
	custom: {
		parent: 'teams',
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'permissions',
			type: 'array',
			label: 'Permissions',
			minRows: 1,
			maxRows: 10,
			fields: [],
			virtual: true,
		},
	],
}
