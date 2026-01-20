import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	const { roles }: { roles: string[] } = await request.json()
	const cookieStore = (await cookies()).get('roles')
	if (!cookieStore?.name) {
		roles.length > 0 && (await cookies()).set('roles', roles.join(','))
	}

	return new Response(null, { status: 200 })
}
