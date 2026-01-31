import { fieldLexical } from '@/_payload/lexical/fieldEditor'
import type { Block } from 'payload'

const SectionHeadingBlock: Block = {
	slug: 'section-heading',
	interfaceName: 'SectionHeadingBlock',
	admin: {
		group: 'Layout & Structure',
	},
	fields: [
		{
			type: 'group',
			name: 'brow',
			virtual: true,
			fields: [
				{
					type: 'checkbox',
					name: 'useBrow',
					defaultValue: false,
					label: 'Use Section Eyebrow',
					virtual: true,
					hooks: {
						afterRead: [
							({ data }) => {
								return (data?.brow?.content ?? []).length > 0
							},
						],
					},
				},
				{
					name: 'content',
					type: 'text',
					label: 'Section Eyebrow',
					admin: {
						condition: (_data, siblingData) => {
							return siblingData?.useBrow == true
						},
					},
					required: true,
					virtual: true,
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
			virtual: true,
		},
		{
			name: 'subtitle',
			type: 'richText',
			label: 'Section Subtitle',
			editor: fieldLexical({}),
			virtual: true,
		},
	],
}

export default SectionHeadingBlock
