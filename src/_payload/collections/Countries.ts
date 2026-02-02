import { ISOField } from '@/_payload/fields/ISOField'
import { NameField } from '@/_payload/fields/NameField'
import type { CollectionConfig, CollectionSlug } from 'payload'

export const CountriesSlug = 'countries' as CollectionSlug
export const CountriesCollection: CollectionConfig = {
	slug: 'countries',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['idString', 'name'],
		description: 'A list of countries with their associated languages and currencies.',
		group: 'Data',
	},
	access: {
		admin: () => false,
		read: () => false,
	},
	defaultSort: 'name',
	fields: [
		{
			name: 'image',
			type: 'join',
			collection: 'country-images',
			on: 'country',
			label: 'Country Image',
			virtual: true,
			admin: {
				width: '100%',
				className: 'basis-full',
				style: {
					width: '100%',
				},
			},
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
	// hooks: {
	// 	beforeOperation: [
	// 		({ req, operation, args }) => {
	// 			if (req.file && (operation == 'create' || operation == 'update')) {
	// 				req.file.name = `${args.data.id}.jpeg`
	// 				req.file.mimetype = 'image/jpeg'
	// 			}
	// 		},
	// 	] as CollectionBeforeOperationHook<'countries'>[],
	// },
}
