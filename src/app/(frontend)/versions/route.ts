import config from '@/_payload/payload.config'
import { getPayload } from 'payload'

export const GET = async () => {
	const payload = await getPayload({ config })
	try {
		await payload.update({
			collection: 'countries',
			where: {
				_status: { equals: 'draft' },
			},
			data: {
				_status: 'published',
			},
		})
		return new Response(null, { status: 200 })
	} catch (e) {
		payload.logger.error({ err: e, message: 'Error publishing country drafts' })
		return new Response('Error publishing country drafts.', { status: 500 })
	}
}
