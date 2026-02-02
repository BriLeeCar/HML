import type { CollectionConfig, CollectionSlug } from 'payload'

export const CountryImagesSlug = 'country-images' as CollectionSlug

export const CountryImagesCollection: CollectionConfig = {
	slug: CountryImagesSlug,
	admin: {
		useAsTitle: 'country',
		group: 'Data',
	},
	fields: [
		{
			type: 'relationship',
			relationTo: 'countries',
			name: 'country',
			required: true,
		},
		{
			type: 'upload',
			name: 'image',
			relationTo: 'media',
			required: true,
		},
	],
}
