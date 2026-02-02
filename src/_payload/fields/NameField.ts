import { toTitleCase } from '@/lib/toTitleCase'
import type { TextField } from 'payload'

export const NameField = ({ ...options }: Omit<TextField, 'type'>): TextField => {
	const beforeChangeHooks = options.hooks?.beforeChange || []

	return {
		...options,
		type: 'text',
		hooks: {
			...options.hooks,
			beforeChange: [...beforeChangeHooks, ({ value }) => toTitleCase(value as string)],
		},
	} as TextField
}
