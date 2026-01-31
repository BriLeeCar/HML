import { fieldLexical } from '@/_payload/lexical/fieldEditor'
import type { GlobalBeforeChangeHook, GlobalConfig } from 'payload'

type ChildLexical = {
	type: string
	text?: string
	children?: ChildLexical[]
}

const parseChildren = (children: ChildLexical[]) => {
	return children.map((child): string => {
		if (child.type === 'text') {
			return child.text || ''
		}
		if (child.children) {
			return parseChildren(child.children).join('')
		}
		return ''
	})
}

export const BannerGlobalSlug = 'banner'

export const BannerGlobalConfig: GlobalConfig = {
	slug: 'banner',
	label: {
		singular: 'Banner',
		plural: 'Banners',
	},
	fields: [
		{
			name: 'state',
			type: 'checkbox',
			label: 'Active',
		},
		{
			name: 'content',
			type: 'richText',
			editor: fieldLexical(),
			label: 'Content',
		},
		{
			name: 'link',
			type: 'text',
		},
		{
			name: 'archiveBtn',
			type: 'text',
			virtual: true,
			admin: {
				components: {
					Field: '@/_payload/globals/Banner/ArchiveBtn',
				},
			},
		},
		{
			name: 'archive',
			type: 'array',
			label: 'FAQ Archive',
			labels: {
				singular: 'Archived Banner Item',
				plural: 'Archived Banner Items',
			},
			fields: [
				{
					name: 'content',
					type: 'text',
					label: 'Content',
				},
				{
					name: 'link',
					type: 'text',
				},
			],
			admin: {
				// readOnly: true,
			},
		},
	],
	hooks: {
		beforeChange: [
			({ data, req }): GlobalBeforeChangeHook => {
				req.payload.logger.info(parseChildren(data.content?.root?.children))

				if (data.archiveBtn) {
					const contentData = parseChildren(data.content?.root?.children).join()

					data.content.root.children = [
						{
							children: [],
							direction: null,
							format: '',
							indent: 0,
							textFormat: 1,
							textStyle: '',
							type: 'paragraph',
							version: 1,
						},
					]

					const archiveItem = {
						content: contentData,
						link: data.link || '',
					}

					return {
						...data,
						link: '',
						archiveBtn: '',
						archive: [archiveItem, ...(data.archive || [])],
					}
				}
				return data
			},
		],
	},
}
