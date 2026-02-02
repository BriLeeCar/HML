import { PathwayDocumentsSlug } from '@/collections/PathwayDocuments'
import { DurationTimeOptions } from '@/fields/DurationField'
import { MinMaxDurationFields } from '@/fields/MinMaxField'
import { NameField } from '@/fields/NameField'
import { cls } from '@/lib/cls'
import type { Currency } from '@/payload-types'
import type { CollectionConfig, CollectionSlug, GroupField, Tab } from 'payload'

export const PathwaysSlug = 'pathways' as CollectionSlug

const general: GroupField = {
	type: 'group',
	fields: [
		{
			name: 'country',
			type: 'relationship',
			relationTo: 'countries',
			hasMany: false,
			label: 'Country',
			required: true,
			admin: {
				allowCreate: false,
				className: 'col-start-1 col-span-1 row-start-1 row-span-1',
			},
		},
		{
			type: 'group',
			admin: {
				hideGutter: true,
				className: 'col-start-1 col-span-1 row-start-2 row-span-1',
			},
			fields: [
				{
					name: 'currency',
					type: 'relationship',
					relationTo: 'currencies',
					required: true,
					label: 'Currency',
					filterOptions: async ({ data, req }) => {
						if (!data?.country) return false

						const matchingCountryCurrencies = (
							await req.payload.findByID({
								collection: 'countries',
								id: data?.country,
							})
						)?.currencies as Currency[]

						return {
							id: {
								in: matchingCountryCurrencies?.map(c => c.id),
							},
						}
					},
					admin: {
						style: {
							flex: '1 0 75%',
						},
						allowCreate: false,
						condition: (_, siblingData) => {
							return siblingData?.useUsd != true
						},
					},
				},
				{
					name: 'useUsd',
					type: 'checkbox',
					label: 'Use USD',
					defaultValue: false,
				},
			],
		},
		{
			name: 'link',
			type: 'text',
			label: 'Link',
			required: true,
			admin: {
				className: 'col-start-1 col-span-1 row-start-3 row-span-1',
			},
		},

		{
			name: 'description',
			type: 'textarea',
			label: 'Description',
			admin: {
				className:
					'row-span-3 max-md:**:[textarea]:h-[235px] md:**:[textarea]:h-[275px] lg:**:[textarea]:h-auto',
			},
			required: true,
		},
	],
}

const timing: Tab = {
	label: 'Timing',

	fields: [
		{
			type: 'group',
			admin: {
				hideGutter: true,
			},
			label: 'Processing Time',
			name: 'processingTime',
			fields: MinMaxDurationFields('processingTime', DurationTimeOptions),
		},
		{
			type: 'group',
			admin: {
				hideGutter: true,
			},
			label: 'Duration',
			name: 'duration',
			fields: MinMaxDurationFields('duration', DurationTimeOptions),
		},
	],
}

const categories: Tab = {
	label: 'Categories',
	fields: [
		{
			type: 'relationship',
			name: 'categories',
			relationTo: 'pathway-categories',
			label: 'Pathway Categories',
			hasMany: true,
			admin: {
				components: {
					Field: '@/components/DynamicOption.server',
				},
			},
		},
	],
}

const cost: Tab = {
	label: 'Documents & Cost',
	fields: [
		{
			label: 'Cost',
			name: 'cost',
			type: 'group',
			admin: {
				hideGutter: true,
			},
			// @ts-expect-error weird typing by Payload
			validate: (value: { maxQty: number; minQty: number }) => {
				if (value.maxQty < value.minQty) {
					return 'Maximum must be greater than or equal to minimum'
				}
				return true
			},
			fields: [
				{
					type: 'checkbox',
					name: 'na',
					label: 'Not Available',
					defaultValue: false,
				},

				{
					name: 'minMaxEqual',
					type: 'checkbox',
					label: 'Minimum and Maximum are equal',
					defaultValue: false,
					admin: {
						style: {
							flexShrink: 1,
						},
					},
				},
				{
					type: 'row',
					admin: {
						condition: (_, siblingData) => {
							return !siblingData ? true : siblingData?.na == false
						},
					},
					fields: [
						{
							name: 'minQty',
							type: 'number',
							label: `Minimum Quantity`,
							required: true,
							hasMany: false,
							min: 0,
							defaultValue: 0,
						},
						{
							name: 'maxQty',
							type: 'number',
							label: `Maximum Quantity`,
							required: true,
							hasMany: false,
							min: 0,
							defaultValue: 0,
							admin: {
								condition: data => {
									if (data?.cost.minMaxEqual == true) return false
									return true
								},
							},
						},
					],
				},
			],
		},
		{
			type: 'array',
			name: 'documents',
			fields: [
				{
					name: 'required',
					type: 'checkbox',
					label: 'Required',
					defaultValue: false,
				},
				{
					name: 'type',
					type: 'relationship',
					label: 'Document Type',
					required: true,
					relationTo: PathwayDocumentsSlug,
				},
				{
					name: 'name',
					type: 'text',
					label: 'Document Name',
					required: true,
				},
				{
					name: 'link',
					type: 'text',
					label: 'Document Link',
				},
				{
					name: 'cost',
					type: 'number',
					label: 'Document Cost',
					min: 0,
				},
				{
					name: 'notes',
					type: 'textarea',
					label: 'Notes',
				},
			],
		},
	],
}

const pipelinesAndRestrictions: Tab = {
	label: 'Other',
	fields: [
		{
			type: 'group',
			admin: {
				hideGutter: true,
				position: 'sidebar',
				description: 'Pipelines this pathway may open up',
			},
			label: 'Pathway Pipelines',
			fields: [
				{
					name: 'renewable',
					type: 'checkbox',
					label: 'Renewable',
				},
				{
					name: 'citizenshipPathway',
					type: 'checkbox',
					label: 'Pathway to Citizenship',
				},
				{
					name: 'residencyPathway',
					type: 'checkbox',
					label: 'Pathway to Residency',
				},
				{
					name: 'reunificationPathway',
					type: 'checkbox',
					label: 'May Allow Reunification',
				},
			],
		},
		{
			type: 'group',
			admin: {
				hideGutter: true,
				description: 'Restrictions that may apply to this pathway',
			},
			label: 'Pathway Restrictions',
			fields: [
				{
					type: 'collapsible',
					label: 'Nationality Restrictions',
					admin: {
						initCollapsed: true,
						components: {
							Label: {
								serverProps: {
									className: cls('text-xl font-semibold'),
								},
								path: '@/components/Label',
							},
						},
					},
					fields: [
						{
							type: 'checkbox',
							label: 'Has Nationality Restrictions',
							virtual: true,
							name: 'hasNationalityRestrictions',

							hooks: {
								afterRead: [
									({ value, data }) => {
										if (data?.restrictedNationalities?.length > 0) {
											return true
										}
										return value ?? false
									},
								],
							},
						},
						{
							type: 'array',
							name: 'restrictedNationalities',
							labels: {
								singular: 'Nationality',
								plural: 'Nationalities',
							},
							admin: {
								condition: (_, siblingData) => {
									return siblingData?.hasNationalityRestrictions
								},
								components: {
									Label: {
										serverProps: {
											className: cls('text-lg font-medium'),
										},
										path: '@/components/Label',
									},
								},
							},
							fields: [
								{
									type: 'relationship',
									relationTo: 'countries',
									name: 'nationality',
									label: 'Country',
									required: true,
								},
								{
									type: 'textarea',
									name: 'notes',
									label: 'Notes',
								},
							],
						},
					],
				},
				{
					label: 'Other Limitations/Restrictions',
					type: 'collapsible',
					admin: {
						initCollapsed: true,
						components: {
							Label: {
								serverProps: {
									className: cls('text-xl font-semibold'),
								},
								path: '@/components/Label',
							},
						},
					},
					fields: [
						{
							name: 'restrictions',
							type: 'array',
							fields: [
								{
									type: 'textarea',
									name: 'restriction',
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'group',
			admin: {
				hideGutter: true,
			},
			fields: [
				{
					name: 'notes',
					type: 'array',
					fields: [
						{
							type: 'textarea',
							name: 'note',
						},
					],
				},
			],
		},
	],
}

export const PathwaysCollection: CollectionConfig = {
	slug: PathwaysSlug,
	defaultSort: 'country',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['country', 'name', 'description', 'categories'],
		hideAPIURL: true,
		group: 'Data',
	},
	fields: [
		NameField({
			name: 'name',
			required: true,
			unique: true,
			label: 'Pathway Name',
		}),
		general,
		{
			type: 'group',
			admin: {
				position: 'sidebar',
				className: cls('sidebar-main sidebar-w-3xl'),
				hideGutter: true,
			},
			fields: [
				{
					type: 'group',
					admin: {
						className: 'md:max-w-6xl max-w-full',
						hideGutter: true,
					},
					fields: [
						{
							type: 'tabs',
							admin: {
								className: 'max-w-full mx-0',
							},
							label: 'Application Details',
							tabs: [timing, categories, cost, pipelinesAndRestrictions],
						},
					],
				},
			],
		},
	],
	versions: true,
}
