import { ISOField } from '@/_payload/fields/ISOField'
import { NameField } from '@/_payload/fields/NameField'
import type { CollectionConfig, CollectionSlug } from 'payload'

export const LanguagesSlug = 'languages' as CollectionSlug

export const LanguagesCollection: CollectionConfig = {
	slug: LanguagesSlug,
	defaultSort: 'id',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['idString', 'name'],
		group: 'Data',
	},
	fields: [
		NameField({
			name: 'name',
			required: true,
			unique: true,
			label: 'Language',
		}),
		...ISOField({
			description: "ISO 639-2 language code (e.g., 'ENG' for English)",
		}),
	],
}
