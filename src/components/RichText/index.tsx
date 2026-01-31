import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import { jsxConverters } from './converters'

type Props = {
	data: DefaultTypedEditorState
	enableGutter?: boolean
	enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({ className, ...props }: Props) {
	return (
		<ConvertRichText
			converters={jsxConverters}
			disableContainer
			disableTextAlign
			className={className}
			{...props}
		/>
	)
}
