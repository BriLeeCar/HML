import {
	type LexicalEditorProps,
	BoldFeature,
	InlineToolbarFeature,
	ItalicFeature,
	lexicalEditor,
	UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { LexicalLinkFeature, setLexicalType } from './root'

export const fieldLexical = (props?: LexicalEditorProps) => {
	const baseConfig = setLexicalType(
		{
			admin: {
				placeholder: 'Start typing...',
				hideAddBlockButton: true,
				hideDraggableBlockElement: true,
				hideInsertParagraphAtEnd: true,
				hideGutter: true,
				...props?.admin,
			},
			features: () => [
				InlineToolbarFeature(),
				UnderlineFeature(),
				BoldFeature(),
				ItalicFeature(),
				LexicalLinkFeature,
			],
			lexical: props?.lexical,
		},
		'field-editor'
	)

	return lexicalEditor(baseConfig)
}
