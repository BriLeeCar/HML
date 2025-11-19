import { ReactNode } from 'react'
import { Icon } from '~/components/Icon'
import {
	Button,
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	Field,
	FieldGroup,
	Label,
	Select,
	Textarea,
} from '.'
import { FormSection, FormSubSection } from './Base'

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
				<OtherRestrictions
					pathwayData={pathwayData}
					dispatchAction={dispatchAction}
				/>
				<RestrctionOpportunitiesCB
					label='Potentially Allows for Reunification'
					description='This pathway could be used to reunify family members under specific conditions.'
					field='reunification'
					data={pathwayData.reunification}
					dispatchAction={dispatchAction}
				/>
				<RestrctionOpportunitiesCB
					label='Has a Route Towards Residency'
					description='This pathway may provide a route to permanent or long-term residency in the country.'
					field='residency'
					data={pathwayData.residency}
					dispatchAction={dispatchAction}
				/>
				<RestrctionOpportunitiesCB
					label='Has a Route Towards Citizenship'
					description='This pathway may provide a route to citizenship in the country.'
					field='citizenship'
					data={pathwayData.citizenship}
					dispatchAction={dispatchAction}
				/>
			</CheckboxGroup>
		</FormSection>
	)
}

const RestrctionOpportunitiesCB = <
	T extends 'residency' | 'citizenship' | ('reunification' & keyof Dispatch.SetterFn),
>({
	label,
	description,
	field,
	data,
	dispatchAction,
	...props
}: Props<typeof Textarea> & {
	dispatchAction: ElProps['dispatchAction']
	label: string
	description: ReactNode
	field: T
	data: State.Base[T]
}) => {
	const dispatchValues = {
		field: field as T,
		type: `set${field.charAt(0).toUpperCase() + field.slice(1)}` as `set${Capitalize<T>}`,
	}

	return (
		<FieldGroup>
			<CheckboxField>
				<Checkbox
					name={field}
					color='yellow'
					defaultChecked={data.value.possible}
					onClick={() => {
						dispatchAction({
							type: dispatchValues.type,
							field: dispatchValues.field,
							payload: {
								...data,
								value: {
									...data.value,
									possible: !data.value.possible,
								},
							},
						} as Dispatch.SetterFn[typeof field])
					}}
				/>
				<Label>{label}</Label>
				<Description>{description}</Description>
			</CheckboxField>
			{data.value.possible && (
				<Textarea
					name={`${field}Notes`}
					{...props}
					className='-mt-4 mb-8 pl-8'
					onBlur={(e) => {
						dispatchAction({
							type: dispatchValues.type,
							field: dispatchValues.field,
							payload: {
								...data,
								value: {
									...data.value,
									note: e.currentTarget.value,
								},
							},
						} as Dispatch.SetterFn[typeof field])
					}}
				/>
			)}
		</FieldGroup>
	)
}

const NationalityRestrictionsCB = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = { ...pathwayData.nationalities }

	return (
		<FieldGroup>
			<CheckboxField>
				<Checkbox
					name='nationalityRestrictions'
					color='yellow'
					defaultChecked={baseData.value.restricted}
					onClick={() => {
						const payload = baseData
						payload.value.restricted = !baseData.value.restricted

						dispatchAction({
							type: 'setNationalities',
							field: 'nationalities',
							payload: payload,
						})
					}}
				/>
				<Label>Has Nationality Restrictions</Label>
				<Description>
					Applicants from certain nationalities may face restrictions or additional requirements
					when applying for this pathway.
				</Description>
			</CheckboxField>

			{baseData.value.restricted && (
				<FormSubSection
					legend='Countries with Restrictions'
					aria-label='Countries with Restrictions'
					description='Please include each country as a separate entry'>
					{baseData.value.nationalities.map((n) => (
						<FieldGroup
							key={n.counter}
							className='ml-6 grid grid-cols-[auto_max-content] border-b-2 border-[#F0EBF1] pt-4 pb-8 pl-6 *:grid *:grid-cols-[.15fr_auto] *:items-baseline *:gap-x-8 last:border-0 last:pb-0 *:last:grid-cols-1'>
							<Field className='col-start-1 mb-1'>
								<Label>Country</Label>
								<Select
									defaultValue={n.country}
									onChange={(e) => {
										const payload = { ...baseData }
										payload.value.nationalities[n.counter].country = e.currentTarget.value

										dispatchAction({
											type: 'setNationalities',
											field: 'nationalities',
											payload: payload,
										})
									}}>
									<option>Select a country</option>
									{pathwayData.db.countries
										.sort((a, b) => a.name.localeCompare(b.name))
										.filter((country) =>
											pathwayData.nationalities.value.nationalities.every(
												(n2) => n2.country !== country.abbr || n2.counter === n.counter
											)
										)
										.map((country) => (
											<option
												key={country.abbr}
												value={country.abbr}>
												{country.name}
											</option>
										))}
								</Select>
							</Field>
							<Field className='col-start-1 mb-1'>
								<Label>Details</Label>
								<Textarea
									name='nationalityRestrictionDetails'
									className='mt-1'
									onBlur={(e) => {
										const payload = { ...baseData }
										payload.value.nationalities[n.counter].note = e.currentTarget.value
										dispatchAction({
											type: 'setNationalities',
											field: 'nationalities',
											payload: payload,
										})
									}}
								/>
							</Field>
							<span className='col-start-2 row-start-1 row-end-3 mt-[0.25lh] flex w-full justify-center pl-2 align-middle'>
								<Button
									type='button'
									iconOnly
									className='mx-auto rounded-full px-1.5 py-0'
									onClick={() =>
										dispatchAction({
											type: 'deleteNationality',
											field: 'nationalities',
											payload: n.counter,
										})
									}>
									<Icon
										IconName='XIcon'
										className='h-fit w-fit text-red-600 hover:text-red-800'
										data-slot='icon'
										solid
									/>
								</Button>
							</span>
						</FieldGroup>
					))}
				</FormSubSection>
			)}
			{baseData.value.restricted && (
				<Button
					type='button'
					size='sm'
					className='my-8 flex w-full items-center justify-center gap-x-2 bg-[#F0EBF1] text-center text-[#74447E] hover:bg-[#74447E] hover:text-[#F0EBF1] focus-visible:outline-offset-1 focus-visible:outline-[#47274E] dark:bg-[#47274E] dark:text-[#F0EBF1] dark:hover:bg-[#74447E] dark:hover:text-[#F0EBF1]'
					onClick={() => {
						baseData.counter += 1
						baseData.value.nationalities.push({
							counter: baseData.counter,
							country: '',
							note: '',
						})
						dispatchAction({
							type: 'setNationalities',
							field: 'nationalities',
							payload: baseData,
						})
					}}>
					<Icon
						IconName='PlusCircleIcon'
						className='h-4 w-4 text-current/75'
						data-slot='icon'
						solid
					/>
					Add Nationality
				</Button>
			)}
		</FieldGroup>
	)
}

const OtherRestrictions = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = { ...pathwayData.restrictions }

	return (
		<FieldGroup>
			<CheckboxField>
				<Checkbox
					name='restrictions'
					color='yellow'
					defaultChecked={baseData.value.hasRestrictions}
					onClick={() => {
						baseData.value.hasRestrictions = !baseData.value.hasRestrictions

						dispatchAction({
							type: 'setRestrictions',
							field: 'restrictions',
							payload: baseData,
						})
					}}
				/>
				<Label>Has Other Restrictions</Label>
				<Description>
					This pathway has other restrictions outside of the pathway type{' '}
					<em className='block text-xs'>
						Restrictions such as employment for work visas or age for working holiday visas would
						not be covered here
					</em>
				</Description>
			</CheckboxField>

			{baseData.value.hasRestrictions && (
				<FormSubSection
					legend='Restrictions'
					aria-label='Restrictions'
					description='Please include each restriction as a separate entry'>
					{baseData.value.restrictions.map((n) => (
						<FieldGroup
							key={n.counter}
							className='ml-6 grid grid-cols-[auto_max-content] border-b-2 border-[#F0EBF1] pt-4 pb-8 pl-6 *:grid *:grid-cols-[.15fr_auto] *:items-baseline *:gap-x-8 last:border-0 last:pb-0 *:last:grid-cols-1'>
							<Field className='col-start-1 mb-1'>
								<Label>Details</Label>
								<Textarea
									name='restrictionDetails'
									className='mt-1'
									onBlur={(e) => {
										baseData.value.restrictions[n.counter].value = e.currentTarget.value
										dispatchAction({
											type: 'setRestrictions',
											field: 'restrictions',
											payload: baseData,
										})
									}}
								/>
							</Field>
							<span className='col-start-2 row-start-1 row-end-3 mt-[0.25lh] flex w-full justify-center pl-2 align-middle'>
								<Button
									type='button'
									iconOnly
									className='mx-auto rounded-full px-1.5 py-0'
									onClick={() =>
										dispatchAction({
											type: 'deleteRestriction',
											field: 'restrictions',
											payload: n.counter,
										})
									}>
									<Icon
										IconName='XIcon'
										className='h-fit w-fit text-red-600 hover:text-red-800'
										data-slot='icon'
										solid
									/>
								</Button>
							</span>
						</FieldGroup>
					))}
				</FormSubSection>
			)}
			{baseData.value.hasRestrictions && (
				<Button
					type='button'
					size='sm'
					className='my-8 flex w-full items-center justify-center gap-x-2 bg-[#F0EBF1] text-center text-[#74447E] hover:bg-[#74447E] hover:text-[#F0EBF1] focus-visible:outline-offset-1 focus-visible:outline-[#47274E] dark:bg-[#47274E] dark:text-[#F0EBF1] dark:hover:bg-[#74447E] dark:hover:text-[#F0EBF1]'
					onClick={() => {
						baseData.counter += 1
						baseData.value.restrictions.push({
							counter: baseData.counter,
							value: '',
						})
						dispatchAction({
							type: 'setRestrictions',
							field: 'restrictions',
							payload: baseData,
						})
					}}>
					<Icon
						IconName='PlusCircleIcon'
						className='h-4 w-4 text-current/75'
						data-slot='icon'
						solid
					/>
					Add Restriction
				</Button>
			)}
		</FieldGroup>
	)
}
