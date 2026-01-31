import type { Data } from '@/payload-fields'
import type {
	CollectionAfterReadHook,
	CollectionBeforeChangeHook,
	Field,
	GroupField,
} from 'payload'
import { def, labelComponent, minMaxEqualCondition, sameUOMCondition } from './_lib'

const CBRow: GroupField = {
	type: 'group',
	fields: [
		{
			type: 'checkbox',
			name: 'na',
			label: 'Not Available',
			defaultValue: false,
			virtual: true,
		},
		{
			type: 'row',
			fields: [
				{
					name: 'minMaxEqual',
					type: 'checkbox',
					label: 'Minimum and Maximum are equal',
					defaultValue: false,
					virtual: true,
				},
				{
					name: 'sameUOM',
					type: 'checkbox',
					label: 'Same Unit of Measurement',
					defaultValue: false,
					virtual: true,
					admin: {
						condition: (_, siblingData) => {
							return siblingData?.minMaxEqual == false
						},
					},
				},
			],
			admin: {
				condition: (_, siblingData) => {
					return !siblingData ? true : siblingData?.na == false
				},
			},
		},
	],
}
type Namekeys = 'min' | 'max'

const Row = ({
	name,
	label,
	uomOptions,
	groupName,
}: {
	name: Namekeys
	label: string
	uomOptions: {
		label: string
		value: string
	}[]
	groupName: string
}): GroupField => ({
	type: 'group',
	name: name,
	label: label,
	virtual: true,
	fields: [
		{
			name: 'qty',
			type: 'number',
			label: `Quantity`,
			required: true,
			virtual: true,
			validate: (
				value: number | undefined | null,
				{ data }: { data: Partial<Data<typeof groupName>> }
			) => {
				if (!value) return 'Quantity is required'

				if (value < 0) return 'Quantity must be a non-negative number'

				if (data && data[groupName]) {
					const { min, max } = data[groupName]
					if (min?.qty && max?.qty && max.qty < min.qty) {
						return 'Maximum quantity cannot be less than Minimum quantity'
					}
				}

				return true
			},
			hasMany: false,
			min: 0,
			defaultValue: 0,
			admin:
				name == 'max' ?
					{
						condition: data => minMaxEqualCondition(data as Data<typeof groupName>),
					}
				:	undefined,
		},
		{
			name: 'uom',
			type: 'select',
			virtual: true,
			required: true,
			options: uomOptions,
			defaultValue: '1',
			admin:
				name == 'max' ?
					{
						condition: data => sameUOMCondition(data as Data<typeof groupName>),
					}
				:	undefined,
		},
	],
	admin: {
		condition: data => {
			if (data && data[groupName]) {
				const { na, minMaxEqual } = data[groupName]
				if (na && na == true) {
					return false
				}
				if (name == 'max' && minMaxEqual && minMaxEqual == true) return false
			}
			return true
		},
		components: {
			Label: labelComponent,
		},
	},
})

const MinMaxVirtualField = ({
	name,
	label,
	uomOptions,
}: {
	name: string
	label: string
	uomOptions: {
		label: string
		value: string
	}[]
}): GroupField => ({
	type: 'group',
	name: name,
	label: label,
	virtual: true,
	fields: [
		CBRow,
		Row({
			name: 'min',
			label: 'Minimum',
			uomOptions,
			groupName: name,
		}),
		Row({
			name: 'max',
			label: 'Maximum',
			uomOptions,
			groupName: name,
		}),
	],
})

export const MinMaxField = ({
	name,
	label,
	uomOptions,
}: {
	name: string
	label: string
	uomOptions: {
		label: string
		value: string
	}[]
}): {
	fields: Field[]
	hooks: {
		beforeChange: CollectionBeforeChangeHook
		afterRead: CollectionAfterReadHook
	}
} => {
	const fields: Field[] = [
		MinMaxVirtualField({
			name: `${name}Virtual`,
			label: label,
			uomOptions,
		}),
		{
			type: 'json',
			name: name,
			defaultValue: def,
			hidden: true,
		},
	]

	const beforeChange: CollectionBeforeChangeHook = ({ data, operation }) => {
		if (operation == 'create' || operation == 'update') {
			const { na, minMaxEqual, sameUOM } = data?.[`${name}Virtual`]
			let { min, max } = data?.[`${name}Virtual`]

			const cbs = {
				na,
				minMaxEqual,
				sameUOM,
			}

			if (typeof minMaxEqual == 'boolean' && minMaxEqual == true) {
				max = min
			}
			if (typeof sameUOM == 'boolean' && sameUOM == true) {
				max.uom = min.uom
			}

			const qty = {
				min,
				max,
			}
			if (data) {
				data[name] = {
					...qty,
					...cbs,
				}
			}

			return data
		}
	}
	const afterRead: CollectionAfterReadHook = ({ doc, req }) => {
		if (!doc) return doc

		doc[name] = doc[name] ?? def
		doc[`${name}Virtual`] = doc[name]

		req.payload.logger.info(doc[name])
		if (doc[name]?.minMaxEqual == true) {
			doc[`${name}Virtual`].max = doc[name].min
		}
		if (doc[name]?.sameUOM == true) {
			doc[`${name}Virtual`].max.uom = doc[name].min.uom
		}

		return doc
	}

	return {
		fields,
		hooks: {
			/**
			 * Before Change Hook
			 * @description Syncs virtual fields to actual stored field before saving to the database
			 *
			 * @param data - The data being saved
			 * @param operation - The type of operation being performed (create, update, etc.)
			 *
			 * @returns The modified data to be saved
			 */
			beforeChange,
			/**
			 * After Read Hook
			 * @description Syncs stored field to virtual fields after reading from the database
			 *
			 * @param doc - The document that was read
			 *
			 * @returns The modified document with virtual fields populated
			 */
			afterRead,
		},
	}
}
