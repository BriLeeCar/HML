import {
	AddButton,
	CheckBox,
	FormSubSection,
	RemoveButton,
	RemoveButtonWrapper,
} from '@/admin/_components'
import { Field, FieldGroup, Label, Select, Textarea } from '@/admin/_components/catalyst'
import type { ElPrismaProps } from '../../_lib'

export const NationalityRestrictionsCB = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: PrismaSchema.CountryModel[]
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
				name='nationalityCB'
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
