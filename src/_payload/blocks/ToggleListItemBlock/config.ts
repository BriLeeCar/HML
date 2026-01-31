import type { Block } from 'payload'

import { blockLexical } from '@/_payload/lexical/BlockEditor'
import { env } from '@/env'

export const ToggleListItemBlock: Block = {
	slug: 'toggle-list-item',
	labels: {
		singular: 'Toggle Item',
		plural: 'Toggle Items',
	},
	imageURL: env.BASE_URL + '/BlockImgs/ToggleListItem.png',
	admin: {
		disableBlockName: true,
		group: 'Content List',
	},

	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'content',
			type: 'richText',
			editor: blockLexical([]),
			label: false,
			required: true,
		},
	],
	interfaceName: 'ToggleListItemBlock',
}
