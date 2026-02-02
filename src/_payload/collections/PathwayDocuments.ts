import type { CollectionConfig, CollectionSlug } from 'payload'

export const PathwayDocumentsSlug = 'pathway-documents' as CollectionSlug

export const PathwayDocumentsCollection: CollectionConfig = {
	slug: PathwayDocumentsSlug,

	custom: {
		parent: 'pathways',
	},
	admin: {
		group: 'Data',
		useAsTitle: 'title',
		defaultColumns: ['title', 'description'],
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: 'Document',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: 'Description',
			required: false,
		},
	],
}
