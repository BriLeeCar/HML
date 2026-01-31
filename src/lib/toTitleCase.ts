const LOWER_CASE_WORDS = [
	'and',
	'or',
	'the',
	'a',
	'an',
	'in',
	'on',
	'with',
	'at',
	'by',
	'for',
	'to',
	'of',
	'but',
	'is',
	'are',
]

const getWordBoundaries = (words: string, i: number) => {
	const n = words.indexOf(' ', i)
	const processed = words.slice(i, n == -1 ? undefined : n)
	return { n, processed }
}

const isFirstChar = (i: number) => i == 0
const alwaysLower = (word: string) => LOWER_CASE_WORDS.includes(word)
const shouldCapitalize = (word: string, i: number) => isFirstChar(i) || !alwaysLower(word)

export const toTitleCase = (value?: string | string[]) => {
	let result = ''
	if (!value) return

	for (let i = 0, n = 0; i < value.length, n != -1; i++) {
		const bounds = getWordBoundaries(Array.isArray(value) ? value.join() : value, i)
		const prepend = i == 0 ? '' : value[i - 1] || ''
		const parsed = () => {
			if (shouldCapitalize(bounds.processed, i)) {
				return bounds.processed[0].toUpperCase() + bounds.processed.slice(1).toLowerCase()
			}
			return bounds.processed.toLowerCase()
		}

		result += prepend + parsed()

		n = bounds.n
		i = bounds.n
	}
	return result
}
