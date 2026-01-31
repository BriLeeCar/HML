import type {
	RichTextBlock,
	SectionBlock,
	ToggleListBlock,
	ToggleListItemBlock,
} from '@/payload-types'
import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'

export type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<ToggleListBlock | ToggleListItemBlock | SectionBlock | RichTextBlock>
