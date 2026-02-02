import RichTextBlockComponent from '@/blocks/RichTextBlock'
import SectionBlockComponent from '@/blocks/SectionBlock'
import { ToggleListComponent } from '@/blocks/ToggleListBlock'
import { ToggleListItemComponent } from '@/blocks/ToggleListItemBlock'

import type { Page } from '@/payload-types'
import type { JSXElementConstructor } from 'react'

const blockComponents = {
	'toggle-list': ToggleListComponent,
	section: SectionBlockComponent,
	'toggle-list-item': ToggleListItemComponent,
	'rich-text': RichTextBlockComponent,
}
export type RenderBlockComponents = JSXElementConstructor<
	(typeof blockComponents)[keyof typeof blockComponents]
>

type BlockKey = keyof typeof blockComponents

export const RenderBlocks = ({ blocks }: { blocks: Page['content'] }) => {
	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

	return (
		hasBlocks
		&& (blocks ?? []).map(({ blockType, ...rest }) => {
			const blockKey = blockType as BlockKey
			const Block = blockKey && blockComponents[blockKey]
			const blockPops = rest as Exclude<
				Record<keyof typeof rest, (typeof rest)[keyof typeof rest]>,
				null | undefined | 'blockType'
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			> as any
			return (
				Block && (
					<Block
						{...blockPops}
						// key={index}
					/>
				)
			)

			return null
		})
	)
}
