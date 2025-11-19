import z from 'zod/v4'
import {
	Combobox,
	ComboboxDescription,
	ComboboxLabel,
	ComboboxOption,
	Error,
	Field,
	FieldGroup,
	Input,
	Label,
	Textarea,
} from '.'

export const Overview = ({
	pathwayData,
	dispatchAction,
}: ElProps) => {
	const dispatchStringField = <F extends keyof Dispatch.StringFields>(
		value: string | null,
		field: F
	) => {
		dispatchAction({
			type: 'set' + field.charAt(0).toUpperCase() + field.slice(1),
			field: field,
			payload: {
				value: value,
				error: [],
			},
		} as unknown as Dispatch.StringFields[F])
	}

	return (
		<FieldGroup className='grid gap-x-8 md:grid-cols-2'>
			{/* ? COUNTRY ID */}
			<Field>
				<Label>Country ID</Label>
				<Combobox
					name='countryId'
					options={pathwayData.countriesWithPathways.map(
						(c) => c.abbr
					)}
					value={pathwayData.countryId.value ?? ''}
					defaultValue={
						pathwayData.countriesWithPathways.find(
							(c) => c.abbr === pathwayData.countryId.value
						)?.abbr ?? undefined
					}
					onChange={(val) => {
						const parsed = z
							.string()
							.toUpperCase()
							.length(3, 'Invalid Country ID')
							.safeParse(val)
						if (parsed.success)
							dispatchAction({
								type: 'setCountryId',
								field: 'countryId',
								payload: {
									value: val,
									error: [],
								},
							})
					}}
					displayValue={(value: string | null) => value?.toString()}>
					{(country) => (
						<ComboboxOption
							value={country}
							key={country}>
							<ComboboxLabel>{country}</ComboboxLabel>
							<ComboboxDescription>
								{pathwayData.countriesWithPathways.find(
									(c) => c.abbr == country
								)?.name ?? country}
							</ComboboxDescription>
						</ComboboxOption>
					)}
				</Combobox>
				<Error message={pathwayData.countryId.error} />
			</Field>
			{/* ? OFFICIAL NAME */}
			<Field>
				<Label>Official Name</Label>
				<Input
					defaultValue={pathwayData.officialName.value ?? undefined}
					name='pathwayOfficialName'
					onBlur={(e) => {
						onBlurDispatchStringField(
							e.currentTarget.value,
							pathwayData,
							'officialName',
							dispatchStringField
						)
					}}
				/>
				<Error message={pathwayData.officialName.error} />
			</Field>
			{/* ? OFFICIAL LINK */}
			<Field>
				<Label>Official Link</Label>
				<Input
					name='pathwayLink'
					type='url'
					onBlur={(e) => {
						onBlurDispatchStringField(
							e.currentTarget.value,
							pathwayData,
							'officialLink',
							dispatchStringField
						)
					}}
				/>
				<Error message={pathwayData.officialLink.error} />
			</Field>
			{/* ? CATEGORY */}
			<Field>
				<Label>Category</Label>
				<Input
					name='pathwayCategory'
					onBlur={(e) =>
						dispatchAction({
							type: 'setCategory',
							field: 'category',
							payload: {
								value: e.currentTarget.value,
								error: [],
							},
						})
					}
				/>
				<Error message={pathwayData.category.error} />
			</Field>
			{/* ? DESCRIPTION */}
			<Field className='col-span-full'>
				<Label>Description</Label>
				<Textarea
					name='pathwayDescription'
					onBlur={(e) =>
						dispatchAction({
							type: 'setDescription',
							field: 'description',
							payload: {
								value: e.currentTarget.value,
								error: [],
							},
						})
					}
				/>
				<Error message={pathwayData.description.error} />
			</Field>
		</FieldGroup>
	)
}

const emptyToNull = (str: string | null) => {
	return (
		typeof str == 'string' ?
			str.trim() === '' ?
				null
			:	str.trim()
		:	null
	)
}

const noChange = (
	field: State.Base.Keys,
	value: State.Base[State.Base.Keys]['value'],
	pathwayData: State.Base
) => {
	const pathValue = pathwayData[field].value

	if (pathValue == value) {
		return true
	}
	return false
}

const onBlurDispatchStringField = (
	value: string | null,
	pathwayData: ElProps['pathwayData'],
	field: Dispatch.StringKeys,
	dispatchFn: (
		value: string | null,
		field: Dispatch.StringKeys
	) => void
) => {
	const val = emptyToNull(value)

	if (!noChange(field, val, pathwayData)) {
		return dispatchFn(value, field)
	}
}
