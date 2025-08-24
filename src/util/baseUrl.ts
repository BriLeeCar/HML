export const getBaseUrl = (url: string) => {
	const base = process.env.VERCEL_URL || 'http://localhost:3000'

	return `${base}${url.startsWith('/') ? '' : '/'}${url}`
}
