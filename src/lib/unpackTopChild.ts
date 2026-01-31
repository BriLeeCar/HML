import type { RichTextBlock } from '@/payload-types'

export const unpackTopChild = (data: RichTextBlock['content'] | null | undefined) => {
	const rootChildren = data?.root?.children
	if (rootChildren && rootChildren.length > 0) {
		if (rootChildren.length == 1) {
			const firstChild = rootChildren[0]
			if (
				firstChild.type === 'paragraph'
				&& (firstChild as (typeof data)['root']).children.length > 0
			) {
				data.root.children = firstChild.children as typeof rootChildren
			}
		}
	}
	return data
}
