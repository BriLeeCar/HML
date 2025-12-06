import {
	AddButton,
	Button,
	CheckBox,
	FormSection,
	FormSubSection,
	RemoveButton,
	RemoveButtonWrapper,
} from '@/admin/_components'
import {
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	Field,
	FieldGroup,
	Label,
	Select,
	Textarea,
} from '@/admin/_components/catalyst'
import { type ReactNode } from 'react'
import { Icon } from '~/components'
import { note, refresh, type ElPrismaProps } from '..'

export const RestrictionsOpportunities = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Array<{ code: string; name: string }>
}) => {
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
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
				/>
				<Limitations
					data={data}
					handlePrisma={handlePrisma}
				/>
				<RestrictionOpportunitiesCB
					label='Potentially Allows for Reunification'
					description='This pathway could be used to reunify family members under specific conditions.'
					field='reunification'
					data={data}
					handlePrisma={handlePrisma}
				/>
				<RestrictionOpportunitiesCB
					label='Has a Route Towards Residency'
					description='This pathway may provide a route to permanent or long-term residency in the country.'
					field='residency'
					data={data}
					handlePrisma={handlePrisma}
				/>
				<RestrictionOpportunitiesCB
					label='Has a Route Towards Citizenship'
					description='This pathway may provide a route to citizenship in the country.'
					field='citizenship'
					data={data}
					handlePrisma={handlePrisma}
				/>
			</CheckboxGroup>
		</FormSection>
	)
}

const RestrictionOpportunitiesCB = <B extends Exclude<keyof Query['piplines'], 'renewal'>>({
	label,
	description,
	field,
	data,
	handlePrisma,
	...props
}: ElPrismaProps
	& Props<typeof Textarea> & {
		label: string
		description: ReactNode
		field: B
	}) => {
	return (
		<FieldGroup>
			<CheckboxField>
				<Checkbox
					name={field}
					color='brand'
					defaultChecked={data.piplines[field]}
					onChange={e => {
						const updated = { ...data }
						updated.piplines[field] = e
						handlePrisma(updated)
					}}
				/>
				<Label>{label}</Label>
				<Description>{description}</Description>
			</CheckboxField>
			{data.piplines[field] == true && (
				<Textarea
					defaultValue={data.query[field] ?? undefined}
					name={`${field}Notes`}
					{...props}
					className='-mt-4 mb-8'
					onBlur={e => {
						handlePrisma(refresh(data, field, e.target.value))
					}}
				/>
			)}
		</FieldGroup>
	)
}

const NationalityRestrictionsCB = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Prisma.Country[]
}) => {
	const cbValue = data.query['restrictedNationalities']?.length > 0

	const handleDelete = (countryCode: string) => {
		handlePrisma({
			...data,
			query: {
				...data.query,
				restrictedNationalities: data.query.restrictedNationalities.filter(
					n => n.countryCode !== countryCode
				),
			},
		})
	}

	const handleNoteChange = (countryCode: string, note: string) => {
		handlePrisma({
			...data,
			query: {
				...data.query,
				restrictedNationalities: data.query.restrictedNationalities.map(n => {
					if (n.countryCode === countryCode) {
						return {
							...n,
							note: note,
						}
					}
					return n
				}),
			},
		})
	}

	const handleCountryChange = (countryCode: string, country: string) => {
		handlePrisma({
			...data,
			query: {
				...data.query,
				restrictedNationalities: data.query.restrictedNationalities.map(n => {
					if (n.countryCode === countryCode) {
						return {
							...n,
							countryCode: country,
						}
					}
					return n
				}),
			},
		})
	}

	const getCountryOptions = () => {
		return countries.sort((a, b) => {
			return a.name.localeCompare(b.name)
		})
	}

	return (
		<FieldGroup>
			<CheckBox
				color='brand'
				label='Has Nationality Restrictions'
				description='Applicants from certain nationalities may face restrictions or additional requirements
					when applying for this pathway.'
				className='aria-checked:[&+label:is([data-slot="label"])]:font-semibold!'
				defaultChecked={cbValue}
				onChange={e => {
					handlePrisma({
						...data,
						query: {
							...data.query,
							restrictedNationalities:
								e ?
									[
										{
											pathwayId: 0,
											countryCode: '',
											note: '',
										},
									]
								:	[],
						},
					})
				}}
			/>

			{cbValue && (
				<>
					<FormSubSection
						className='*:data-[slot="legend"]:text-current/70 md:pl-8'
						legend='Countries with Restrictions'
						aria-label='Countries with Restrictions'
						description='Please include each country as a separate entry'>
						<FieldGroup className='flex flex-col'>
							{data.query.restrictedNationalities.map(n => (
								<FieldGroup
									key={n.countryCode}
									className='grid grid-cols-[auto_.15fr] *:grid *:grid-cols-[3.5rem_auto] *:items-baseline *:gap-x-8 *:last:grid-cols-1'>
									<Field className='col-start-1 mb-1'>
										<Label>Country</Label>
										<Select
											defaultValue={n.countryCode}
											onChange={e => handleCountryChange(n.countryCode, e.currentTarget.value)}>
											<option>Select a country</option>
											{getCountryOptions().map(country => (
												<option
													key={country.code}
													value={country.code}>
													{country.name}
												</option>
											))}
										</Select>
									</Field>
									<Field className='col-start-1'>
										<Label>Details</Label>
										<Textarea
											defaultValue={n.note || undefined}
											name='nationalityRestrictionDetails'
											className='mt-1'
											onBlur={e => handleNoteChange(n.countryCode, e.currentTarget.value)}
										/>
									</Field>
									<RemoveButtonWrapper className='mt-3 self-start'>
										<RemoveButton onClick={() => handleDelete(n.countryCode)} />
									</RemoveButtonWrapper>
								</FieldGroup>
							))}
						</FieldGroup>
					</FormSubSection>

					<AddButton
						onClick={() => {
							handlePrisma({
								...data,
								query: {
									...data.query,
									restrictedNationalities: [
										...data.query.restrictedNationalities,
										{
											pathwayId: 0,
											countryCode: '',
											note: '',
										},
									],
								},
							})
						}}>
						Nationality
					</AddButton>
				</>
			)}
		</FieldGroup>
	)
}

const Limitations = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<FieldGroup>
			<CheckBox
				defaultChecked={data.query.limitations?.length > 0}
				onClick={() => {
					handlePrisma(note(data, 'limitations', 'add'))
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

			{data.query.limitations?.length > 0 && (
				<FormSubSection
					className='md:pl-8'
					legend='Limitations'
					aria-label='Limitations'
					description='Please include each limitation as a separate entry'>
					<FieldGroup className='flex flex-col'>
						{data.query.limitations.map(n => (
							<div
								key={n.counter}
								className='grid grid-cols-[auto_.15fr] *:items-baseline *:last:grid-cols-1'>
								<Field className='col-start-1 mb-1'>
									<Textarea
										defaultValue={n.note}
										name={`limitationDetails${n.counter}`}
										className='mt-1'
										onBlur={e => {
											handlePrisma(
												note(
													data,
													'limitations',
													'update',
													{
														...n,
														note: e.target.value,
													},
													n.counter
												)
											)
										}}
									/>
								</Field>
								<RemoveButtonWrapper>
									<RemoveButton
										onClick={() => handlePrisma(note(data, 'limitations', 'remove', n, n.counter))}
									/>
								</RemoveButtonWrapper>
							</div>
						))}
					</FieldGroup>
				</FormSubSection>
			)}
			{data.query.limitations?.length > 0 && (
				<Button
					type='button'
					size='sm'
					innerButton
					onClick={() => {
						handlePrisma(note(data, 'limitations', 'add'))
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
