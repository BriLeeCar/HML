import type { Block } from 'payload'

import { fieldLexical } from '@/_payload/lexical/fieldEditor'
import { env } from '@/env'
import { ToggleListItemBlock } from '../ToggleListItemBlock/config'

export const ToggleListBlock: Block = {
	slug: 'toggle-list',
	labels: {
		singular: 'Toggle List',
		plural: 'Toggle Lists',
	},
	imageURL: env.BASE_URL + '/BlockImgs/ToggleList.png',
	admin: {
		disableBlockName: true,
		group: 'Content List',
	},
	fields: [
		{
			name: 'title',
			type: 'richText',
			editor: fieldLexical({
				admin: {
					placeholder: 'List Title',
				},
			}),
			label: false,
		},
		{
			type: 'blocks',
			name: 'items',
			blocks: [ToggleListItemBlock],
		},
	],

	interfaceName: 'ToggleListBlock',
}
