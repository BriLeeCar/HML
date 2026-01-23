import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

export const config = {
	matcher: ['/admin/:path*'],
}

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith('/admin/auth')) {
		return NextResponse.next()
	}

	const token = await getToken({
		req,
		secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
		secureCookie: req.nextUrl.protocol === 'https:',
	})
	if (!token) {
		console.warn('No token found, redirecting to signin')
		const newUrl = new URL('/admin/auth/signin', req.nextUrl.origin)
		return NextResponse.redirect(newUrl)
	}

	return NextResponse.next()
}
