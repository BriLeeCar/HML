import { auth } from '~/server/auth'

export default auth(req => {
	if (!req.auth && req.nextUrl.pathname !== '/login') {
		const newUrl = new URL(`/api/auth/signin`, req.nextUrl.origin)
		return Response.redirect(newUrl)
	}
})

export const config = {
	matcher: ['/admin((?:/[^auth]).*)?'],
}
