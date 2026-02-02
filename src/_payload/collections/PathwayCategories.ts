import type { CollectionConfig, CollectionSlug } from 'payload'

export const PathwayCategoriesSlug = 'pathway-categories' as CollectionSlug

export const PathwayCategoriesCollection: CollectionConfig = {
	slug: PathwayCategoriesSlug,
	custom: {
		parent: 'pathways',
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'description'],
		group: 'Data',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: 'Category',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: 'Description',
			required: false,
		},
		{
			name: 'parent',
			type: 'relationship',
			relationTo: 'pathway-categories',
			label: 'Parent Category',
		},
	],
}
