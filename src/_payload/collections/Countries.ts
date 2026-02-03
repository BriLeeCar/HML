import { ISOField } from '@/_payload/fields/ISOField'
import { NameField } from '@/_payload/fields/NameField'
import type { CollectionConfig, CollectionSlug } from 'payload'

export const CountriesSlug = 'countries' as CollectionSlug
export const CountriesCollection: CollectionConfig = {
	slug: 'countries',
	admin: {
		useAsTitle: 'name',

		description: 'A list of countries with their associated languages and currencies.',
		group: 'Data',
	},
	versions: {
		maxPerDoc: 10,
		drafts: true,
	},
	access: {
		read: () => true,
		create: () => true,
		update: () => true,
		delete: () => true,
		readVersions: () => true,
	},
	defaultSort: 'name',
	fields: [
		{
			name: 'photo',
			type: 'upload',
			relationTo: 'media',
			label: 'Country Photo',
			admin: {
				width: '50%',
			},
			filterOptions: {
				mimeType: { contains: 'image/' },
				'folder.name': { equals: 'Country Images' },
			},
			displayPreview: true,
		},
		...ISOField({
			admin: {
				width: '10%',
				className: 'flex-wrapped',
			},
		}),
		NameField({
			name: 'name',
			required: true,
			unique: true,
			label: 'Country Name',
			admin: {
				width: '90%',
			},
		}),
		{
			type: 'row',
			fields: [
				{
					type: 'relationship',
					name: 'languages',
					relationTo: 'languages',
					hasMany: true,
					label: 'Languages Spoken',
					admin: {
						width: '50%',
					},
				},
				{
					admin: {
						width: '50%',
					},
					name: 'currencies',
					type: 'relationship',
					relationTo: 'currencies',
					hasMany: true,
					label: 'Currencies',
				},
			],
		},
		{
			type: 'join',
			collection: 'country-attribute-values',
			on: 'country',
			name: 'attributes',
			virtual: true,
			admin: {
				defaultColumns: ['attribute', 'value'],
				disableListFilter: true,
				description: 'Attributes associated with this country.',
			},
		},
		{
			type: 'collapsible',
			label: 'Map SVG Path',
			hidden: true,
			fields: [
				{
					type: 'textarea',
					name: 'mapSvgPath',
					label: 'Path Data',
				},
			],
		},
	],
}
