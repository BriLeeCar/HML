import { fieldLexical } from '@/_payload/lexical/fieldEditor'
import type { Block, Field } from 'payload'
import RichTextBlock from '../RichTextBlock/config'
import { ToggleListBlock } from '../ToggleListBlock/config'
import { ToggleListItemBlock } from '../ToggleListItemBlock/config'

const sectionFields: Field[] = [
	{
		type: 'group',
		name: 'brow',
		fields: [
			{
				type: 'radio',
				name: 'type',
				options: [
					{
						label: 'Custom',
						value: 'custom',
					},
					{
						label: 'None',
						value: 'none',
					},
				],
				defaultValue: 'none',
				required: true,
				label: 'Section Brow Type',
			},
			{
				name: 'content',
				type: 'text',
				label: 'Section Brow',
				admin: {
					condition: (_data, siblingData) => {
						return siblingData?.type == 'custom'
					},
				},
				required: true,
			},
		],
		label: false,
	},
	{
		name: 'title',
		type: 'richText',
		label: 'Section Heading',
		editor: fieldLexical({}),
		required: true,
	},
	{
		name: 'subtitle',
		type: 'richText',
		label: 'Section Subtitle',
		editor: fieldLexical({}),
	},
	{
		name: 'content',
		type: 'blocks',
		label: false,
		required: true,
		blocks: [RichTextBlock, ToggleListBlock, ToggleListItemBlock],
		admin: {
			initCollapsed: true,
		},
	},
]

const SectionBlock: Block = {
	slug: 'section',
	interfaceName: 'SectionBlock',
	admin: {
		group: 'Layout & Structure',
	},
	fields: sectionFields,
}

export default SectionBlock
