import { toTitleCaseHook } from '@/_payload/hooks/toTitleCase'
import type { TextField } from 'payload'

export const NameField = ({ ...options }: Omit<TextField, 'type'>): TextField => {
	const beforeChangeHooks = options.hooks?.beforeChange || []

	return {
		...options,
		type: 'text',
		hooks: {
			...options.hooks,
			beforeChange: [...beforeChangeHooks, toTitleCaseHook],
		},
	} as TextField
}
