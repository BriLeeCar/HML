import { createApi } from 'unsplash-js'
import z from 'zod/v4'

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY!,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

type tImageOptions = z.infer<typeof zImageOptions>

export const getUnsplashPhoto = async (
	photoId: string,
	options?: tImageOptions
) => {
	const api = unsplash.photos
	if (!api) {
		console.warn('Unsplash API not initialized properly.')
		return null
	}
	const response = await api.get({ photoId: photoId, ...options })
	if (response.errors) {
		console.warn('Unsplash API Error:', response)
	}
	return response.errors ? null : response.response
}
