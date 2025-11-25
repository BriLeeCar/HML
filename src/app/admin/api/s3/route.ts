// s3 router

import { NextResponse, type NextRequest } from 'next/server'
import { deleteFile, uploadFile } from '~/server/s3'

export const POST = async (req: NextRequest) => {
	const data = await req.formData()

	const parsed = {
		image: data.get('image'),
		key: data.get('key'),
	}

	if (parsed.image instanceof File && typeof parsed.key === 'string') {
		const file = await parsed.image.arrayBuffer()

		const caller = await uploadFile(Buffer.from(file), parsed.key)

		return new Response(JSON.stringify(caller), {
			status: caller.$metadata.httpStatusCode,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	return NextResponse.json({ error: 'Invalid request', image: data.get('key') }, { status: 400 })
}

export const DELETE = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url)
	const key = searchParams.get('key')

	if (key) {
		const caller = await deleteFile(key)
		if (caller.$metadata.httpStatusCode == 204) {
			return NextResponse.json({ success: true, caller })
		}
		return NextResponse.json({
			caller,
		})
	}
	return NextResponse.json({ error: 'Invalid request, no key' }, { status: 400 })
}
