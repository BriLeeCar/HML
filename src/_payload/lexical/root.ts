import { cls } from '@/lib/cls'
import {
	type LexicalEditorProps,
	type LinkFields,
	defaultEditorLexicalConfig,
	LinkFeature,
} from '@payloadcms/richtext-lexical'
import { type TextFieldSingleValidation } from 'payload'

export const LexicalLinkFeature = LinkFeature({
	fields: ({ defaultFields }) => {
		const defaultFieldsWithoutUrl = defaultFields.filter(field => {
			if ('name' in field && field.name === 'url') return false
			return true
		})

		return [
			...defaultFieldsWithoutUrl,
			{
				name: 'url',
				type: 'text',
				admin: {
					condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
				},
				label: ({ t }) => t('fields:enterURL'),
				required: true,
				validate: ((value, options) => {
					if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
						return true // no validation needed, as no url should exist for internal links
					}
					return value ? true : 'URL is required'
				}) as TextFieldSingleValidation,
			},
		]
	},
})

export const setLexicalType = (config: LexicalEditorProps, name: string) => {
	let { lexical } = config
	if (!lexical) {
		lexical = {
			namespace: name,
			theme: {
				...defaultEditorLexicalConfig.theme,
				root: cls(name, defaultEditorLexicalConfig.theme.root ?? ''),
			},
		}
	}

	Object.assign(config, {
		lexical,
	})

	return config
}
