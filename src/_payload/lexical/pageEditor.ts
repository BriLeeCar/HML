import {
	BlockquoteFeature,
	BlocksFeature,
	BoldFeature,
	defaultColors,
	EXPERIMENTAL_TableFeature,
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	ItalicFeature,
	lexicalEditor,
	OrderedListFeature,
	ParagraphFeature,
	TextStateFeature,
	UnderlineFeature,
	UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { ToggleListBlock } from '../blocks/ToggleListBlock/config'
import { ToggleListItemBlock } from '../blocks/ToggleListItemBlock/config'
import { LexicalLinkFeature } from './root'

export const pageLexical = lexicalEditor({
	features: () => [
		InlineToolbarFeature(),
		FixedToolbarFeature({
			customGroups: {
				text: {
					type: 'dropdown',
				},
				table: {
					type: 'buttons',
				},
			},
		}),
		HeadingFeature({
			enabledHeadingSizes: ['h1', 'h2', 'h3'],
		}),
		// no props
		BlockquoteFeature(),
		// no props
		OrderedListFeature(),
		// no props
		UnorderedListFeature(),
		// no props
		ParagraphFeature(),
		// no props
		UnderlineFeature(),
		// no props
		BoldFeature(),
		// no props
		ItalicFeature(),
		LexicalLinkFeature,
		TextStateFeature({
			state: {
				level: {
					section: {
						label: 'Section Heading',
						css: {
							'font-size': '2rem',
							'line-height': 'var(--leading-tight)',
							'letter-spacing': '-.02em',
							'font-weight': 'var(--font-weight-semibold)',
							'text-wrap': 'pretty',
						},
					},
					subsection: {
						label: 'Subsection Heading',
						css: {
							'font-size': '1.5rem',
							'line-height': 'var(--leading-snug)',
							'letter-spacing': '-.01em',
							'font-weight': 'var(--font-weight-medium)',
							'text-wrap': 'pretty',
						},
					},
				},
				...defaultColors,
			},
		}),
		EXPERIMENTAL_TableFeature(),
		BlocksFeature({
			blocks: [ToggleListBlock, ToggleListItemBlock],
		}),
	],
})
