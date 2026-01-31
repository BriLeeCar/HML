import { toTitleCase } from '@/lib/toTitleCase'
import type { FieldHookArgs } from 'payload'

export const toTitleCaseHook = ({ value }: FieldHookArgs) => {
	return toTitleCase(value as string)
}
