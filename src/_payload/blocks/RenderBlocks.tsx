import { ToggleList } from '@/_payload/blocks/ToggleListBlock/Component'
import RichTextComponent from '@/blocks/RichTextBlock/Component'
import SectionComponent from '@/blocks/SectionBlock/Component'
import { ToggleListItem } from '@/blocks/ToggleListItemBlock/Component'

import type { Page } from '@/payload-types'
import { Fragment } from 'react/jsx-runtime'

type RenderBlockComponents =
	| typeof ToggleList
	| typeof SectionComponent
	| typeof ToggleListItem
	| typeof RichTextComponent

const blockComponents = {
	'toggle-list': ToggleList,
	section: SectionComponent,
	'toggle-list-item': ToggleListItem,
	'rich-text': RichTextComponent,
} as Record<string, RenderBlockComponents>

export const RenderBlocks: React.FC<{
	blocks: Exclude<Page['content'], null | undefined>
}> = props => {
	const { blocks } = props

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

	if (hasBlocks) {
		return blocks.map((block, index) => {
			const { blockType } = block

			if (blockType && blockType in blockComponents) {
				const Block = blockComponents[blockType as keyof typeof blockComponents]
				// const blockProps = block as RenderBlocksProps

				if (Block) {
					return (
						<Fragment key={index}>
							{/* @ts-expect-error Unsure the correct typing here */}
							<Block {...block} />
						</Fragment>
					)
				}
			}
			return null
		})
	}

	return null
}
