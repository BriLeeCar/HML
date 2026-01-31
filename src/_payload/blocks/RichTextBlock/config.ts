import { ToggleListBlock } from '@/_payload/blocks/ToggleListBlock/config'
import { ToggleListItemBlock } from '@/_payload/blocks/ToggleListItemBlock/config'
import { blockLexical } from '@/_payload/lexical/BlockEditor'
import type { Block } from 'payload'

const RichTextBlock: Block = {
	slug: 'rich-text',
	interfaceName: 'RichTextBlock',
	admin: {
		group: 'Content',
	},
	fields: [
		{
			name: 'content',
			type: 'richText',
			label: false,
			required: true,
			editor: blockLexical([ToggleListBlock, ToggleListItemBlock]),
		},
	],
}

export default RichTextBlock
