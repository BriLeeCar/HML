import RichText from '@/components/RichText'
import type { RichTextBlock } from '@/payload-types'

const RichTextBlockComponent = ({ content }: RichTextBlock) => {
	return (
		<RichText
			data={content}
			enableGutter={false}
		/>
	)
}

export default RichTextBlockComponent
