import type { CollectionConfig } from 'payload'

export const CountryAttributesSlug = 'country-attributes' as const

export const CountryAttributesCollection: CollectionConfig = {
	slug: 'country-attributes',
	admin: {
		useAsTitle: 'attribute',
		group: 'Data',
	},
	fields: [
		{
			name: 'attribute',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
		},
		{
			name: 'exampleValue',
			type: 'text',
		},
		{
			type: 'group',
			name: 'source',
			fields: [
				{
					name: 'noSingleSource',
					type: 'checkbox',
					label: 'No Single Source',
				},
				{
					name: 'name',
					type: 'text',
					label: 'Source Name',
					admin: {
						condition: siblingData => !siblingData?.noSingleSource == true,
					},
				},
				{
					name: 'url',
					type: 'text',
					label: 'Source URL',
					admin: {
						condition: siblingData => !siblingData?.noSingleSource == true,
					},
				},
			],
		},
		{
			name: 'dataType',
			type: 'select',
			options: [
				{
					label: 'Text',
					value: 'string',
				},
				{
					label: 'Number',
					value: 'number',
				},
				{
					label: 'Percentage',
					value: 'percentage',
				},
				{
					label: 'Currency',
					value: 'currency',
				},
				{
					label: 'True/False',
					value: 'boolean',
				},
				{
					label: 'Date',
					value: 'date',
				},
				{
					label: 'Link',
					value: 'link',
				},
				{
					label: 'Other',
					value: 'other',
				},
			],
		},
	],
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				// When a Country Attribute is changed, update all related Country Attribute Values' descriptions
				await req.payload.update({
					collection: 'country-attribute-values',
					where: {
						attribute: {
							equals: doc.id,
						},
					},
					data: {
						description: doc.description || null,
					},
				})
			},
		],
	},
}
