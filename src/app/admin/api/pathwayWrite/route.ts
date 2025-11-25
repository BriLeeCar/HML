import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const ADMIN_DISCORD_HANDLE = process.env.ADMIN_DISCORD_HANDLE

export async function POST(request: Request) {
	const test = await request.json()
	const userHandle = new URL(request.url).searchParams.get('handle')

	const approved_handles = Object.keys(
		JSON.parse(ADMIN_DISCORD_HANDLE?.replaceAll("'", '"') || '{}')
	)

	if (!userHandle || !approved_handles.includes(userHandle)) {
		return NextResponse.json(
			{ success: false, message: JSON.stringify(ADMIN_DISCORD_HANDLE) },
			{ status: 401 }
		)
	}

	const filePath = path.join(
		process.cwd(),
		'src',
		'app',
		'admin',
		'data-collection',
		'pathwayTestData.json'
	)

	try {
		const exisitingFileData = await fs.readFile(filePath, 'utf-8')

		const parsedData = JSON.parse(exisitingFileData)
		parsedData.push(test)

		await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), 'utf-8')

		return NextResponse.json({
			success: true,
		})
	} catch (error) {
		return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
	}
}
