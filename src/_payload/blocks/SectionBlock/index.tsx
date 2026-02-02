import { RenderBlocks } from '@/blocks/RenderBlocks'
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

const SectionBlockComponent = ({
	content,
	...props
}: {
	brow?: SectionBlock['brow']
	mainTitle?: SectionBlock['mainTitle']
	subtitle?: SectionBlock['subtitle']
	content?: SectionBlock['content']
}) =>
	[props.brow, props.mainTitle, props.subtitle].every(el => !el) ? null : (
		<Section>
			<SectionTitle
				brow={props.brow}
				title={props.mainTitle}
				subtitle={props.subtitle}
			/>
			{(content ?? []).map((block, index) => {
				return block.blockType == 'rich-text' ?
						<RichText
							key={index}
							data={block.content}
							enableGutter={false}
						/>
					:	<RenderBlocks
							key={index}
							blocks={[block]}
						/>
			})}
		</Section>
	)

const SectionTitle = ({
	brow,
	title,
	subtitle,
}: {
	brow?: SectionBlock['brow']
	title?: SectionBlock['mainTitle']
	subtitle?: SectionBlock['subtitle']
}) => {
	const useBrow = brow?.type != 'none'
	const useSubtitle = subtitle ? subtitle.root?.children?.length > 0 : false
	const useHGroup = useBrow || useSubtitle

	const parsedSubtitle = { ...subtitle }

	if (parsedSubtitle && parsedSubtitle.root?.children) {
		type rootKids = typeof parsedSubtitle.root.children
		if (parsedSubtitle.root.children[0]?.type == 'paragraph') {
			parsedSubtitle.root.children = parsedSubtitle.root.children[0]?.children as rootKids
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
					subtitle={unpackTopChild(subtitle)!}
				/>
			</SectionHGroup>
		)
	} else {
		return (
			title && (
				<SectionHeading>
					<RichText
						data={title}
						enableGutter={false}
					/>
				</SectionHeading>
			)
		)
	}
}

const Eyebrow = ({ useBrow, ...props }: { useBrow: boolean; children?: Props['children'] }) =>
	useBrow == true && <SectionEyebrow {...props} />

const Subtitle = ({
	useSubtitle,
	subtitle,
}: {
	useSubtitle: boolean
	subtitle?: SectionBlock['subtitle']
}) =>
	subtitle
	&& useSubtitle && (
		<SectionSubtitle>
			<RichText
				data={subtitle}
				enableGutter={false}
			/>
		</SectionSubtitle>
	)

const SectionTitleInner = ({
	useBrow,
	useSubtitle,
	brow,
	title,
	subtitle,
}: {
	useBrow: boolean
	useSubtitle: boolean
	brow?: SectionBlock['brow']
	title: SectionBlock['mainTitle']
	subtitle: SectionBlock['subtitle']
}) => {
	return (
		<>
			<Eyebrow useBrow={useBrow}>{brow?.content}</Eyebrow>
			<SectionHeading>
				<RichText
					data={title}
					enableGutter={false}
				/>
			</SectionHeading>
			<Subtitle
				useSubtitle={useSubtitle}
				subtitle={subtitle}
			/>
		</>
	)
}

export default SectionBlockComponent
