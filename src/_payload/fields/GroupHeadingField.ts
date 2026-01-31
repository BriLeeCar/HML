import { toTitleCase } from '@/lib/toTitleCase'
import type { Field, GroupField } from 'payload'

export const GroupHeading = (
	name: string,
	level: 'page' | 'section' | 'subsection'
): GroupField => ({
	type: 'group' as GroupField['type'],
	name: `${name}${toTitleCase(level)}Heading`,
	label: `${toTitleCase(level)} Heading`,
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'subtitle',
			type: 'text',
			admin: {
				placeholder: 'Optional subtitle',
				description: 'Overview text that appears below the title.',
			},
		},
		{
			name: 'eyebrow',
			type: 'text',
			admin: {
				placeholder: 'Optional eyebrow',
				description: 'Appears above the title in smaller text.',
			},
		},
	] as Field[],
})
