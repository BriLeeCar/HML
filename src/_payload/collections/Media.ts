import type { CollectionConfig, CollectionSlug } from 'payload'

export const MediaSlug = 'media' as CollectionSlug

export const MediaCollection: CollectionConfig = {
	slug: MediaSlug,
	admin: {
		group: 'Content',
	},
	access: {
		read: () => true,
	},
	folders: {
		browseByFolder: true,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
		{
			name: 'fileName',
			type: 'text',
			admin: {
				description: 'Alternative file name (optional)',
			},
		},
	],
	upload: true,
}
