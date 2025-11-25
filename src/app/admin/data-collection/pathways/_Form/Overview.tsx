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
} from '@/data-collection/pathways'
import z from 'zod/v4'

export const Overview = ({ pathwayData, dispatchAction }: ElProps) => {
	return (
		<FieldGroup className='grid gap-x-8 md:grid-cols-2'>
			{/* ? COUNTRY ID */}
			<Field aria-required='true'>
				<Label>Country ID</Label>
				<Combobox
					name='countryId'
					options={pathwayData.countriesWithPathways.map(c => c.abbr)}
					value={pathwayData.countryId.value ?? ''}
					defaultValue={
						pathwayData.countriesWithPathways.find(c => c.abbr === pathwayData.countryId.value)
							?.abbr ?? undefined
					}
					onChange={val => {
						const parsed = z.string().toUpperCase().length(3, 'Invalid Country ID').safeParse(val)
						if (parsed.success)
							dispatchAction({
								field: 'countryId',
								payload: parsed.data,
							})
					}}
					displayValue={(value: string | null) => value?.toString()}>
					{country => (
						<ComboboxOption
							value={country}
							key={country}>
							<ComboboxLabel>{country}</ComboboxLabel>
							<ComboboxDescription>
								{pathwayData.countriesWithPathways.find(c => c.abbr == country)?.name ?? country}
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
					onBlur={e => {
						onBlurDispatchStringField(
							e.currentTarget.value,
							pathwayData,
							'officialName',
							dispatchAction
						)
					}}
				/>
				<Error message={pathwayData.officialName.error} />
			</Field>
			{/* ? OFFICIAL LINK */}
			<Field>
				<Label>Official Link</Label>
				<Input
					defaultValue={pathwayData.officialLink.value ?? undefined}
					name='pathwayLink'
					type='url'
					onBlur={e => {
						onBlurDispatchStringField(
							e.currentTarget.value,
							pathwayData,
							'officialLink',
							dispatchAction
						)
					}}
				/>
				<Error message={pathwayData.officialLink.error} />
			</Field>
			{/* ? CATEGORY */}
			<Field>
				<Label>Category</Label>
				<Input
					defaultValue={pathwayData.category.value ?? undefined}
					name='pathwayCategory'
					onBlur={e => console.log(e.currentTarget.value)}
				/>
				<Error message={pathwayData.category.error} />
			</Field>
			{/* ? DESCRIPTION */}
			<Field className='col-span-full'>
				<Label>Description</Label>
				<Textarea
					defaultValue={pathwayData.description.value ?? undefined}
					name='pathwayDescription'
					onBlur={e =>
						dispatchAction({
							field: 'description',
							payload: e.currentTarget.value,
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
	field: PathwaysStringKeys,
	value: Pathways[PathwaysStringKeys]['value'],
	pathwayData: Pathways
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
	field: PathwaysStringKeys,
	dispatchFn: (props: { field: PathwaysStringKeys; payload: string | null }) => void
) => {
	const val = emptyToNull(value)

	if (!noChange(field, val, pathwayData)) {
		return dispatchFn({
			field: field,
			payload: val,
		})
	}
}
