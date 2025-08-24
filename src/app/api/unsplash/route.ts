import { NextResponse } from 'next/server'
import { createApi } from 'unsplash-js'
import z from 'zod/v4'

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY!,
})

const zImageOptions = z.object({
	w: z.number().min(1).max(4000).optional(),
	h: z.number().min(1).max(4000).optional(),
	dpr: z.number().min(1).max(5).optional(),
	q: z.number().min(0).max(100).optional(),
	auto: z.boolean().optional(),
	fit: z
		.enum([
			'clamp',
			'clip',
			'crop',
			'facearea',
			'fill',
			'fillmax',
			'max',
			'min',
			'scale',
		])
		.default('clip')
		.optional(),
})

const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url)
	const options = zImageOptions.safeParse({
		w:
			searchParams.get('w') ?
				Number(searchParams.get('w'))
			:	undefined,
		h:
			searchParams.get('h') ?
				Number(searchParams.get('h'))
			:	undefined,
		dpr:
			searchParams.get('dpr') ?
				Number(searchParams.get('dpr'))
			:	undefined,
		q:
			searchParams.get('q') ?
				Number(searchParams.get('q'))
			:	undefined,
		auto:
			searchParams.get('auto') ?
				searchParams.get('auto') === 'true'
			:	undefined,
		fit:
			searchParams.get('fit') ?
				String(searchParams.get('fit'))
			:	undefined,
	})
	const photoId = searchParams.get('id')

	if (!photoId) {
		return new Response(
			JSON.stringify({ error: 'Missing photo id' }),
			{ status: 400 }
		)
	}

	const response = await unsplash.photos.get({
		photoId: photoId,
		...options,
	})
	if (response.errors) {
		console.warn('Unsplash API Error:', response)
		return new Response(JSON.stringify({ error: response.errors }), {
			status: 500,
		})
	}
	return new NextResponse(JSON.stringify(response.response), {
		status: 200,
	})
}

export { GET }
