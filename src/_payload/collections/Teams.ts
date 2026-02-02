import { CollectionKeys } from '@/_payload/collectionKeys'
import { toTitleCase } from '@/lib/toTitleCase'
import { type CheckboxField, type CollectionConfig, type CollectionSlug } from 'payload'

export const TeamsSlug = 'teams' as CollectionSlug

const focusAreas = () =>
	Object.values(CollectionKeys).reduce((acc, current) => {
		// const payload = getPayload()
		const entry = {
			name: current,
			type: 'checkbox' as CheckboxField['type'],
			label: toTitleCase(current.replaceAll('-', ' ')),
			custom: {},
		}
		acc.push(entry)

		return acc
	}, [] as CheckboxField[])

export const TeamsCollection: CollectionConfig = {
	slug: TeamsSlug,
	custom: {
		parent: 'users',
	},
	admin: {
		useAsTitle: 'name',
		group: 'General',
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'parentTeam',
			type: 'relationship',
			relationTo: 'teams',
			hasMany: false,
		},
		{
			name: 'collections',
			type: 'group',
			label: 'Focus Areas',
			fields: focusAreas(),
		},
	],
}
