import { createApi } from 'unsplash-js'

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
})

export const getPhoto = async ({ photoId }: { photoId: string }) => {
	const response = await unsplash.photos.get({ photoId })
	if (response.errors) {
		console.error('Error fetching photo:', response.errors)
		return null
	}
	return response.response
}
