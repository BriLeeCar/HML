import type { Field, Option } from 'payload'

export const MinMaxDurationFields = (path: string, options: Option[]): Field[] => [
	{
		type: 'checkbox',
		name: 'na',
		label: 'Not Available',
		defaultValue: false,
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
				name: 'minUom',
				type: 'select',
				label: 'Minimum UOM',

				required: true,
				options: options,
				defaultValue: '1',
			},
		],
	},
	{
		type: 'row',
		admin: {
			condition: (_, siblingData) => {
				if (siblingData) {
					if (siblingData.minMaxEqual == true) {
						return false
					}

					return siblingData.na == false
				}
				return true
			},
		},
		fields: [
			{
				name: 'maxQty',
				type: 'number',
				label: `Maximum Quantity`,
				required: true,
				hasMany: false,
				min: 0,
				defaultValue: 0,
			},
			{
				name: 'maxUom',
				label: 'Maximum UOM',
				type: 'select',

				required: true,
				options: options,
				defaultValue: '1',
				admin: {
					condition: data => {
						if (data?.[path].sameUOM == true) return false
						return true
					},
				},
			},
		],
	},
	{
		admin: {
			condition: (_, siblingData) => {
				return !siblingData ? true : siblingData?.na == false
			},
		},
		type: 'group',
		fields: [
			{
				name: 'minMaxEqual',
				type: 'checkbox',
				label: 'Minimum and Maximum are equal',
				defaultValue: false,
			},
			{
				name: 'sameUOM',
				type: 'checkbox',
				label: 'Same Unit of Measurement',
				defaultValue: false,

				admin: {
					condition: (_, siblingData) => {
						return siblingData?.minMaxEqual == false
					},
				},
			},
		],
	},
]
