'use client'

import { useRowLabel } from '@payloadcms/ui'

const ArrayRowLabel = ({ defaultTitle }: { defaultTitle: string }) => {
	const { data } = useRowLabel<{ title?: string }>()
	const customLabel = data.title || `New ${defaultTitle}` || ''

	return customLabel
}

export default ArrayRowLabel
