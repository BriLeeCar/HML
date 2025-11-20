import fs from 'fs/promises'
import * as dataFile from './data.json'

export const saveFile = async (data: State.Base) => {
	const originalFile = dataFile as {
		pathways: State.Base[]
	}

	originalFile.pathways.push(data)

	await fs
		.writeFile(
			'src/app/admin/data-collection/pathways/data.json',
			JSON.stringify(originalFile, null, 2)
		)
		.then(() => {
			console.log('File successfully saved!')
		})
}
