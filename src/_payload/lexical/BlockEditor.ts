import {
	BlockquoteFeature,
	BlocksFeature,
	BoldFeature,
	defaultColors,
	EXPERIMENTAL_TableFeature,
	FixedToolbarFeature,
	HeadingFeature,
	IndentFeature,
	InlineToolbarFeature,
	ItalicFeature,
	lexicalEditor,
	OrderedListFeature,
	ParagraphFeature,
	TextStateFeature,
	UnderlineFeature,
	UnorderedListFeature,
	type LexicalEditorProps,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { LexicalLinkFeature, setLexicalType } from './root'

export const blockLexical = (blocks: Block[], props?: LexicalEditorProps) => {
	const baseConfig = setLexicalType(
		{
			admin: {
				placeholder: 'Start typing...',
				...props?.admin,
			},
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
				IndentFeature(),
				EXPERIMENTAL_TableFeature(),
				BlocksFeature({
					blocks: blocks,
				}),
			],
			lexical: props?.lexical,
		},
		'block-editor'
	)

	return lexicalEditor(baseConfig)
}
