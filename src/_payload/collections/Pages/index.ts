import RichTextBlock from '@/blocks/RichTextBlock/config'
import { type CollectionConfig, type CollectionSlug, slugField } from 'payload'
import SectionBlock from '../../blocks/SectionBlock/config'
import { ToggleListBlock } from '../../blocks/ToggleListBlock/config'
import { ToggleListItemBlock } from '../../blocks/ToggleListItemBlock/config'

export const PagesSlug = 'pages' as CollectionSlug

export const PagesCollection: CollectionConfig = {
	slug: PagesSlug,
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'status', 'path'],
		groupBy: true,
		group: 'Content',
	},
	fields: [
		slugField({
			useAsSlug: 'path',
			position: '' as unknown as undefined,
		}),
		{
			name: 'status',
			type: 'checkbox',
			label: 'Status',
			defaultValue: false,
			admin: {
				components: {
					Cell: '@/collection/Pages/ListView/StatusCell',
				},
			},
		},
		{
			name: 'parent',
			type: 'relationship',
			relationTo: 'pages',
			label: 'Nested Under',
			admin: {
				description: 'Select a parent page to nest this page under.',
				components: {
					Field: '@/collection/Pages/EditView/ParentField',
				},
			},
			virtual: true,
		},
		{
			name: 'path',
			type: 'text',
			// required: true,
			unique: true,
			index: true,
			admin: {
				description:
					'The URL path for this page (e.g., about would target the url: helpmeleave.us/about).',
				components: {
					Cell: '@/collection/Pages/ListView/PathCell',
				},
			},
		},
		{
			type: 'group',
			fields: [
				{
					type: 'row',
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
							admin: {
								description: 'The title of the page. Used within the H1 tag.',
							},
						},
						{
							name: 'brow',
							type: 'text',
						},
					],
				},
				{
					name: 'subtitle',
					type: 'text',
				},
			],
			label: 'Page Heading',
		},
		{
			name: 'content',
			type: 'blocks',
			blocks: [SectionBlock, ToggleListBlock, ToggleListItemBlock, RichTextBlock],
			admin: {
				initCollapsed: true,
			},
		},
	],
}
