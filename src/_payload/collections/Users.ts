import { TimeZone } from '@/lib/getTimezone'
import { toTitleCase } from '@/lib/toTitleCase'
import type { CollectionConfig, CollectionSlug, Field } from 'payload'

const PronounGroups: Field[] = [
	['he', 'him', 'his'],
	['she', 'her', 'hers'],
	['they', 'them', 'theirs'],
].map(pronounSet => ({
	type: 'row',
	admin: {
		className: 'grouped-cols-3',
	},
	fields: pronounSet.map(field => ({
		name: field,
		type: 'checkbox',
		label: toTitleCase(field),
	})),
}))

export const UsersSlug = 'users' as CollectionSlug

export const UsersCollection: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'username',
		defaultColumns: ['username', 'discordHandle', 'pronounsString'],
		group: 'General',
	},
	auth: {
		loginWithUsername: {
			requireEmail: false,
		},
		verify: false,
	},
	folders: {
		browseByFolder: true,
	},

	fields: [
		{
			name: 'username',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'pending',
			type: 'checkbox',
			admin: {
				readOnly: true,
			},
		},
		{
			name: 'key',
			type: 'text',
			// required: true,
			unique: true,
			admin: {
				readOnly: true,
			},
		},
		{
			name: 'teams',
			type: 'relationship',
			relationTo: 'teams',
			hasMany: true,
		},
		{
			type: 'row',
			fields: [
				{
					name: 'firstName',
					type: 'text',
				},
				{
					name: 'lastName',
					type: 'text',
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'timezone',
					type: 'select',
					label: 'Timezone',
					options: Intl.supportedValuesOf('timeZone').map(tzString => {
						const tz = new TimeZone(tzString)
						return {
							label: tz.toString(),
							value: tz.zone,
						}
					}),
				},
				{
					name: 'discordHandle',
					type: 'text',
					label: 'Discord Handle',
				},
			],
		},
		{
			name: 'pronouns',
			type: 'group',
			label: 'Pronouns',
			admin: {
				className: 'grouped-rows-w-1/2',
			},
			fields: [...PronounGroups],
		},
		{
			name: 'pronounsString',
			type: 'text',
			label: 'Pronouns',
			virtual: true,
			admin: {
				readOnly: true,
				hidden: true,
			},
			hooks: {
				afterRead: [
					({ siblingData }) => {
						const { pronouns } = siblingData
						if (!pronouns) return ''
						return Object.entries(pronouns)
							.map(([key, val]) => {
								if (val === true) return toTitleCase(key)
								return null
							})
							.filter(Boolean)
							.join('/')
					},
				],
			},
		},
	],
}
