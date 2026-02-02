import { GroupHeading } from '@/_payload/fields/GroupHeadingField'
import type { CollectionConfig, CollectionSlug } from 'payload'

export const GuidesSlug = 'guides' as CollectionSlug

export const GuidesCollection: CollectionConfig = {
	slug: GuidesSlug,
	admin: {
		useAsTitle: 'title',
		group: 'Content',
	},
	fields: [
		{
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'subtitle',
					type: 'text',
					admin: {
						placeholder: 'Optional subtitle',
						description: 'Overview text that appears below the title.',
					},
				},
				{
					name: 'eyebrow',
					type: 'text',
					admin: {
						placeholder: 'Optional eyebrow',
						description: 'Appears above the title in smaller text.',
					},
				},
			],
		},
		{
			name: 'sections',
			type: 'array',
			label: 'Sections',
			virtual: true,
			minRows: 1,
			fields: [
				GroupHeading('section', 'section'),
				{
					name: 'content',
					type: 'richText',
					label: 'Content',
					required: true,
				},
			],
		},
	],
}

export default GuidesCollection
