'use client'
import { InputBase } from './Form'
import { tPathwayForm } from './schema'
import { tPathwaySimpleKeys } from './utils'

export const simpleStateInit: {
	[key in Exclude<tPathwaySimpleKeys, 'countryId'>]: {
		value: string | null
		error: string | null
	}
} = {
	pathwayId: { value: '', error: null },
	shortName: { value: '', error: null },
	officialName: { value: '', error: null },
	link: { value: '', error: null },
	category: { value: '', error: null },
	description: { value: '', error: null },
}

export const SimpleInput = ({
	label,
	schemaKey,
	pathway,
	handleChange,
	...props
}: {
	label: string
	schemaKey: tPathwaySimpleKeys
	pathway: tPathwayForm
	handleChange: (
		schemaKey: tPathwaySimpleKeys,
		val: string | undefined
	) => void
} & Props.WithRef<'input'>) => {
	return (
		<InputBase
			defaultValue={pathway[schemaKey].value ?? undefined}
			{...props}
			id={schemaKey}
			label={label}
			schemaKey={schemaKey}
			onBlur={(e) => handleChange(schemaKey, e.target.value)}
			error={{
				location: 'above',
				message: pathway[schemaKey]?.error,
			}}
		/>
	)
}
