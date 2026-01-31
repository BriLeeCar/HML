'use client'

import { SaveButton, useForm } from '@payloadcms/ui'

const ArchiveBtn = () => {
	const form = useForm()

	return (
		<>
			<SaveButton label='Archive' />
		</>
	)
}

export default ArchiveBtn
