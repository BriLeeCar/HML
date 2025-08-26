import { readFileSync, statSync } from 'fs'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import path from 'path'

export const getSourceRaw = (
	sourceType: 'raw' | 'path',
	source: string
) => {
	let raw: string
	if (sourceType == 'raw') {
		raw = source
	} else {
		raw = readFileSync(path.join(process.cwd(), source), 'utf-8')
	}
	const { frontmatter, strippedSource } = getFrontmatter(raw)

	return {
		raw: strippedSource,
		frontmatter: frontmatter as Record<string, string | string[]>,
	}
}

export const getPrelimSource = (
	sourceType: 'raw' | 'path',
	source: string
) => {
	const prelimType: 'raw' | 'path' = sourceType
	try {
		statSync(path.join(process.cwd(), source))
		return prelimType
	} catch (error) {
		console.warn(`MDXProcessor: File not found at ${source}`, error)
		return 'raw'
	}
}
