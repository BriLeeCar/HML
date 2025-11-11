const strLength = (length: number, qualifier: string) =>
	`${['exactly', 'at least'].includes(qualifier) ? 'Must be' : 'Cannot be'} ${qualifier} ${length} characters long`

const stringErrors = {
	strExact: (length: number) => strLength(length, 'exactly'),
	strMin: (length: number) => strLength(length, 'at least'),
	strMax: (length: number) => strLength(length, 'more than'),
}

export const errors = {
	...stringErrors,
}
