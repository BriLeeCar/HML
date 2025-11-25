import {
	AddButton,
	Button,
	CheckBox,
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	Field,
	FieldGroup,
	FormSection,
	FormSubSection,
	Label,
	RemoveButton,
	RemoveButtonWrapper,
	Select,
	Textarea,
} from '@/data-collection/pathways'
import { type ReactNode } from 'react'
import { Icon } from '~/components/Icon'

export const RestrictionsOpportunities = ({ pathwayData, dispatchAction }: ElProps) => {
	return (
		<FormSection
			title='Restrictions & Opportunities'
			role='group'
			aria-label='Limitations & Requirements'
			description={
				'This section gathers any specific limitations or requirements associated with the pathway. This may include eligibility criteria, nationality restrictions, or other important notes.'
			}>
			<CheckboxGroup>
				<NationalityRestrictionsCB
					pathwayData={pathwayData}
					dispatchAction={dispatchAction}
				/>
				<Limitations
					pathwayData={pathwayData}
					dispatchAction={dispatchAction}
				/>
				<RestrictionOpportunitiesCB
					label='Potentially Allows for Reunification'
					description='This pathway could be used to reunify family members under specific conditions.'
					field='reunificationPossible'
					noteField='reunificationNote'
					data={pathwayData}
					dispatchAction={dispatchAction}
				/>
				<RestrictionOpportunitiesCB
					label='Has a Route Towards Residency'
					description='This pathway may provide a route to permanent or long-term residency in the country.'
					field='residencyPossible'
					noteField='residencyNote'
					data={pathwayData}
					dispatchAction={dispatchAction}
				/>
				<RestrictionOpportunitiesCB
					label='Has a Route Towards Citizenship'
					description='This pathway may provide a route to citizenship in the country.'
					field='citizenshipPossible'
					noteField='citizenshipNote'
					data={pathwayData}
					dispatchAction={dispatchAction}
				/>
			</CheckboxGroup>
		</FormSection>
	)
}

const RestrictionOpportunitiesCB = <B extends PathwaysBooleanKeys, A extends PathwaysStringKeys>({
	label,
	description,
	field,
	noteField,
	data,
	dispatchAction,
	...props
}: Props<typeof Textarea> & {
	dispatchAction: ElProps['dispatchAction']
	label: string
	description: ReactNode
	field: B
	noteField: A
	data: PathwaysWithDB
}) => {
	const dbData = { ...data[field] }
	const noteData = { ...data[noteField] }

	return (
		<FieldGroup>
			<CheckboxField>
				<Checkbox
					name={field}
					color='brand'
					defaultChecked={dbData.value}
					onClick={() => {
						dispatchAction({
							field: field,
							payload: !dbData.value,
						})
					}}
				/>
				<Label>{label}</Label>
				<Description>{description}</Description>
			</CheckboxField>
			{dbData.value && (
				<Textarea
					defaultValue={noteData.value ?? undefined}
					name={`${field}Notes`}
					{...props}
					className='-mt-4 mb-8'
					onBlur={e => {
						dispatchAction({
							field: noteField,
							payload: e.currentTarget.value,
						})
					}}
				/>
			)}
		</FieldGroup>
	)
}

const NationalityRestrictionsCB = ({ pathwayData, dispatchAction }: ElProps) => {
	type RestrictedNationality = PathwaysWithDB['restrictedNationalities']['value'][number]

	const cbValue = { ...pathwayData.hasNationalityRestrictions }
	const baseData = { ...pathwayData.restrictedNationalities }

	const handleDelete = (counter: number) => {
		dispatchAction({
			type: 'delete',
			field: 'restrictedNationalities',
			payload: counter,
		})
	}

	const handleNoteChange = (data: RestrictedNationality, note: string) => {
		dispatchAction({
			type: 'update',
			field: 'restrictedNationalities',
			payload: {
				counter: data.counter,
				value: {
					...data,
					note: note,
				},
			},
		})
	}

	const handleCountryChange = (data: RestrictedNationality, country: string) => {
		dispatchAction({
			type: 'update',
			field: 'restrictedNationalities',
			payload: {
				counter: data.counter,
				value: {
					...data,
					country: country,
				},
			},
		})
	}

	const getCountryOptions = (data: RestrictedNationality) => {
		return pathwayData.db.countries
			.sort((a, b) => {
				return a.name.localeCompare(b.name)
			})
			.filter(country => {
				return baseData.value.every(n2 => {
					return n2.country !== country.abbr || n2.counter === data.counter
				})
			})
	}

	return (
		<FieldGroup>
			<CheckBox
				color='brand'
				label='Has Nationality Restrictions'
				description='Applicants from certain nationalities may face restrictions or additional requirements
					when applying for this pathway.'
				// name='nationalityRestrictions'
				className='aria-checked:[&+label:is([data-slot="label"])]:font-semibold!'
				defaultChecked={cbValue.value}
				onClick={() => {
					dispatchAction({
						field: 'hasNationalityRestrictions',
						payload: !cbValue.value,
					})
				}}
			/>

			{cbValue.value && (
				<>
					<FormSubSection
						className='*:data-[slot="legend"]:text-current/70 md:pl-8'
						legend='Countries with Restrictions'
						aria-label='Countries with Restrictions'
						description='Please include each country as a separate entry'>
						<FieldGroup className='flex flex-col'>
							{baseData.value.map(n => (
								<FieldGroup
									key={n.counter}
									className='grid grid-cols-[auto_.15fr] *:grid *:grid-cols-[3.5rem_auto] *:items-baseline *:gap-x-8 *:last:grid-cols-1'>
									<Field className='col-start-1 mb-1'>
										<Label>Country</Label>
										<Select
											defaultValue={n.country}
											onChange={e => handleCountryChange(n, e.currentTarget.value)}>
											<option>Select a country</option>
											{getCountryOptions(n).map(country => (
												<option
													key={country.abbr}
													value={country.abbr}>
													{country.name}
												</option>
											))}
										</Select>
									</Field>
									<Field className='col-start-1'>
										<Label>Details</Label>
										<Textarea
											defaultValue={n.note}
											name='nationalityRestrictionDetails'
											className='mt-1'
											onBlur={e => handleNoteChange(n, e.currentTarget.value)}
										/>
									</Field>
									<RemoveButtonWrapper className='mt-3 self-start'>
										<RemoveButton onClick={() => handleDelete(n.counter)} />
									</RemoveButtonWrapper>
								</FieldGroup>
							))}
						</FieldGroup>
					</FormSubSection>

					<AddButton
						onClick={() => {
							dispatchAction({
								type: 'add',
								field: 'restrictedNationalities',
								payload: null,
							})
						}}>
						Nationality
					</AddButton>
				</>
			)}
		</FieldGroup>
	)
}

const Limitations = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = { ...pathwayData }

	return (
		<FieldGroup>
			<CheckBox
				defaultChecked={baseData.hasLimitations.value}
				onClick={() => {
					dispatchAction({
						field: 'hasLimitations',
						payload: !baseData.hasLimitations.value,
					})
				}}
				label='Has Other Limitations'
				description={
					<>
						This pathway has other limitations outside of the pathway type{' '}
						<em className='block text-xs'>
							Limitations such as employment for work visas or age for working holiday visas would
							not be covered here
						</em>
					</>
				}
			/>

			{baseData.hasLimitations.value && (
				<FormSubSection
					className='md:pl-8'
					legend='Limitations'
					aria-label='Limitations'
					description='Please include each limitation as a separate entry'>
					<FieldGroup className='flex flex-col'>
						{baseData.limitations.value.map(n => (
							<div
								key={n.counter}
								className='grid grid-cols-[auto_.15fr] *:items-baseline *:last:grid-cols-1'>
								<Field className='col-start-1 mb-1'>
									<Textarea
										defaultValue={n.note}
										name={`limitationDetails${n.counter}`}
										className='mt-1'
										onBlur={e => {
											dispatchAction({
												type: 'update',
												field: 'limitations',
												payload: {
													counter: n.counter,
													value: {
														...n,
														note: e.currentTarget.value,
													},
												},
											})
										}}
									/>
								</Field>
								<RemoveButtonWrapper>
									<RemoveButton
										onClick={() =>
											dispatchAction({
												type: 'delete',
												field: 'limitations',
												payload: n.counter,
											})
										}
									/>
								</RemoveButtonWrapper>
							</div>
						))}
					</FieldGroup>
				</FormSubSection>
			)}
			{baseData.hasLimitations.value && (
				<Button
					type='button'
					size='sm'
					innerButton
					onClick={() => {
						dispatchAction({
							type: 'add',
							field: 'limitations',
							payload: null,
						})
					}}>
					<Icon
						IconName='PlusCircleIcon'
						className='h-4 w-4 text-current/75'
						data-slot='icon'
						solid
					/>
					Add Limitation
				</Button>
			)}
		</FieldGroup>
	)
}
