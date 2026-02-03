import type { CollectionConfig, CollectionSlug } from 'payload'

export const MediaSlug = 'media' as CollectionSlug

export const MediaCollection: CollectionConfig = {
	slug: MediaSlug,
	admin: {
		group: 'Content',
	},
	folders: {
		browseByFolder: true,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
		},
	],
	upload: {
		bulkUpload: true,
		mimeTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf'],
	},
}
