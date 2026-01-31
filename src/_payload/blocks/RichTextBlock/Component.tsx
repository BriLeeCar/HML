import RichText from '@/components/RichText'
import type { RichTextBlock } from '@/payload-types'

const RichTextComponent = ({ content }: RichTextBlock) => {
	return (
		<RichText
			data={content}
			enableGutter={false}
		/>
	)
}

export default RichTextComponent
