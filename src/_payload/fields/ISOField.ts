import { toUpperCase } from '@/lib/toUpperCase'
import type { FieldCustom, TextField, TextFieldSingleValidation } from 'payload'

type ISOFieldOptions = {
	name?: string
	description?: string
	label?: string
	length?: number
	hasMany?: false
} & Partial<
	Omit<
		TextField,
		| 'name'
		| '_sanitized'
		| 'type'
		| 'validate'
		| 'localized'
		| 'index'
		| 'immutable'
		| 'hidden'
		| 'readOnly'
		| 'width'
		| 'style'
		| 'placeholder'
		| 'maxLength'
		| 'minLength'
		| 'pattern'
		| 'maxRows'
		| 'minRows'
	>
>

/**
 * Creates a Payload field configuration for an ISO 3-letter alpha code.
 *
 *
 * @param description - Optional description for the field in the admin UI. Defaults to "ISO 3-letter alpha code".
 * @param label - Optional label for the field in the admin UI. Defaults to "ISO Code".
 * @param length - Optional length for the ISO code. Defaults to 3.
 * @returns 2 Payload text fields: one for the ISO code and a virtual field for the string representation of the ID. Virtual field is named 'idString'.
 */
export const ISOField = ({
	name,
	description,
	label,
	length,
	...options
}: ISOFieldOptions): TextField[] => {
	const { unique, required, custom, admin, ...otherOpts } = options

	return [
		{
			type: 'text',
			name: name ?? 'id',
			unique: unique ?? true,
			required: required ?? true,
			custom: {
				length: length ?? 3,
				...custom,
			} as FieldCustom,
			label: label || 'ISO Code',
			admin: {
				description: description ?? 'ISO 3-letter alpha code',
				...admin,
			},
			validate: isoCodeValidation,
			hooks: {
				beforeChange: [toUpperCase],
			},
			...otherOpts,
		},
		{
			type: 'text',
			name: 'idString',
			virtual: true,
			label: 'ID',
			admin: {
				hidden: true,
			},
			hooks: {
				afterRead: [
					({ data }) => {
						if (typeof data?.id === 'string') {
							return data.id
						}
						return null
					},
				],
			},
		},
	]
}

const isoCodeValidation: TextFieldSingleValidation = value => {
	;[
		{
			status: typeof value == 'string',
			message: 'ISO code must be a string',
		},
		{
			status: /^[A-Za-z]{3}$/.test((value ?? '').trim()),
			message: 'ISO code must be exactly 3 alphabetic characters',
		},
	].forEach(({ status, message }) => {
		if (!status) return message
	})

	return true
}
