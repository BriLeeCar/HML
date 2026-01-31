import type { CollectionConfig } from 'payload'
import { toTitleCase } from './../../lib/toTitleCase'

export const CountryAttributeValuesSlug = 'country-attribute-values' as const
export const CountryAttributeValuesCollection: CollectionConfig = {
	slug: 'country-attribute-values',
	admin: {
		useAsTitle: 'nameString',
	},
	fields: [
		{
			name: 'idString',
			type: 'text',
			unique: true,
			hidden: true,
		},
		{
			label: 'Name',
			admin: {
				readOnly: true,
			},
			name: 'nameString',
			type: 'text',
			unique: true,
		},
		{
			name: 'description',
			type: 'textarea',
			admin: {
				readOnly: true,
			},
		},
		{
			type: 'row',

			fields: [
				{
					name: 'dataType',
					type: 'text',
					admin: {
						readOnly: true,
					},
					virtual: true,
				},
				{
					name: 'exampleValue',
					type: 'text',
					admin: {
						readOnly: true,
					},
					virtual: true,
				},
				{
					name: 'sourceInfo',
					type: 'text',
					admin: {
						readOnly: true,
					},
					virtual: true,
				},
			],
		},
		{
			name: 'country',
			type: 'relationship',
			relationTo: 'countries',
			required: true,
		},
		{
			name: 'attribute',
			type: 'relationship',
			relationTo: 'country-attributes',
			required: true,
		},
		{
			name: 'value',
			type: 'text',
			required: true,
		},
	],
	hooks: {
		afterRead: [
			async ({ doc, req }) => {
				if (doc && doc.attribute) {
					const attribute = await req.payload.findByID({
						collection: 'country-attributes',
						id: doc.attribute,
					})
					if (attribute) {
						doc.dataType = toTitleCase(attribute.dataType ?? '')
						doc.exampleValue = attribute.exampleValue || ''
						if (attribute.source?.noSingleSource) {
							doc.sourceInfo = 'Multiple Sources'
						} else {
							doc.sourceInfo = attribute.source?.name || ''
						}
					}
				}
				return doc
			},
		],
		beforeChange: [
			async ({ data, operation, req }) => {
				if (operation == 'create') {
					if (data && data.country && data.attribute) {
						const countryId = data.country
						const attributeId = data.attribute

						const attributeName = await req.payload.findByID({
							collection: 'country-attributes',
							id: attributeId,
						})
						if (attributeName) {
							data.nameString = `${countryId} - ${attributeName?.attribute}`
							data.description = attributeName?.description || ''
						}

						data.idString = `country-${countryId}-attribute-${attributeId}`
					}
				}
				return data
			},
		],
	},
}
