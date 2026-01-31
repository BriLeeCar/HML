import { ISOField } from '@/_payload/fields/ISOField'
import { NameField } from '@/_payload/fields/NameField'
import type { CollectionConfig, CollectionSlug } from 'payload'

export const CurrenciesSlug = 'currencies' as CollectionSlug

export const CurrenciesCollection: CollectionConfig = {
	slug: CurrenciesSlug,
	defaultSort: 'id',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['idString', 'name', 'symbol'],
	},
	fields: [
		NameField({
			name: 'name',
			required: true,
			unique: true,
			label: 'Currency Name',
		}),
		...ISOField({
			description: "ISO 4217 currency code (e.g., 'USD' for US Dollar)",
		}),
		{
			name: 'symbol',
			type: 'text',
			maxLength: 5,
			minLength: 1,
			label: 'Currency Symbol',
			required: true,
		},
	],
}
