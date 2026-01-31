import RichText from '@/components/RichText'
import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '@/components/Structure/Section'
import { unpackTopChild } from '@/lib/unpackTopChild'
import type { SectionBlock } from '@/payload-types'
import { RenderBlocks } from '../RenderBlocks'

const SectionComponent = ({ brow, title, subtitle, content }: SectionBlock) => {
	return (
		<Section>
			<SectionTitle
				brow={brow}
				title={title}
				subtitle={subtitle}
			/>
			{content
				&& content.map((block, index) => {
					if (block.blockType == 'rich-text') {
						return (
							<RichText
								key={index}
								data={block.content}
								enableGutter={false}
							/>
						)
					} else {
						return (
							<RenderBlocks
								key={index}
								blocks={[block]}
							/>
						)
					}
				})}
		</Section>
	)
}

const SectionTitle = ({
	brow,
	title,
	subtitle,
}: Pick<SectionBlock, 'brow' | 'title' | 'subtitle'>) => {
	const useBrow = brow?.type != 'none'
	const useSubtitle = subtitle ? subtitle.root?.children?.length > 0 : false
	const useHGroup = useBrow || useSubtitle

	if (subtitle && subtitle.root?.children) {
		const { children } = subtitle.root
		if (children[0]?.type == 'paragraph') {
			const paragraphChildren = children[0]?.children as typeof children
			subtitle.root.children = paragraphChildren
		}
	}

	if (useHGroup) {
		return (
			<SectionHGroup>
				<SectionTitleInner
					useBrow={useBrow}
					useSubtitle={useSubtitle}
					brow={brow}
					title={unpackTopChild(title)!}
					subtitle={unpackTopChild(subtitle)}
				/>
			</SectionHGroup>
		)
	} else {
		return (
			<SectionHeading>
				<RichText
					data={title}
					enableGutter={false}
				/>
			</SectionHeading>
		)
	}
}

const SectionTitleInner = ({
	useBrow,
	useSubtitle,
	brow,
	title,
	subtitle,
}: Pick<SectionBlock, 'brow' | 'title' | 'subtitle'> & {
	useBrow: boolean
	useSubtitle: boolean
}) => {
	return (
		<>
			{useBrow && <SectionEyebrow>{brow.content}</SectionEyebrow>}
			<SectionHeading>
				<RichText
					data={title}
					enableGutter={false}
				/>
			</SectionHeading>
			{useSubtitle && subtitle && (
				<SectionSubtitle>
					<RichText
						data={subtitle}
						enableGutter={false}
					/>
				</SectionSubtitle>
			)}
		</>
	)
}

export default SectionComponent
