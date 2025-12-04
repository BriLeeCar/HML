import {
	betaCountries,
	Combobox,
	ComboboxDescription,
	ComboboxLabel,
	ComboboxOption,
	Error,
	Field,
	FieldGroup,
	FormSection,
	Input,
	InputGroup,
	Label,
	Textarea,
	type ElPrismaProps,
	type FieldElProps,
} from '@/data-collection/pathways'
import z from 'zod/v4'
import { Icon } from '~/components/Icon'
import type { Country } from '~/server/prisma/generated/browser'
import { FieldLink } from './LinkField'
import { refresh } from './refresh'

const OverviewField = ({ ...props }: FieldElProps) => {
	return (
		<Field {...props.fieldProps}>
			<Label
				{...props.labelProps}
				required={props.required}>
				{props.label}
			</Label>
			{props.children}
			<Error message={props.errorMessages} />
		</Field>
	)
}

export const OverviewSection = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Country[]
}) => {
	return (
		<FormSection
			title='Overview'
			aria-label='Pathway Overview'
			description={
				'This section collects the basic information about the pathway. Please ensure that all information is accurate and corresponds to official sources where applicable.'
			}>
			<FieldGroup className='grid gap-x-8 md:grid-cols-2'>
				{/* ? COUNTRY ID */}
				<OverviewField
					label='Country ID'
					required
					errorMessages={data.errors?.countryCode}>
					<InputGroup>
						<Icon
							IconName='GlobeStandIcon'
							data-slot='icon'
						/>
						<Combobox
							invalid={(data.errors?.countryCode.length ?? 0 > 0) ? true : undefined}
							name='countryCode'
							options={countries
								.filter(c => betaCountries.findIndex(b => b.code == c.code) != -1)
								.sort((a, b) => a.code.localeCompare(b.code))
								.map(c => c.code)}
							defaultValue={data.query?.countryCode}
							onChange={val => {
								const parsed = z
									.string()
									.toUpperCase()
									.length(3, 'Invalid Country ID')
									.safeParse(val)

								if (parsed.success) {
									const newData = { ...data }
									newData.query.countryCode = parsed.data
									const country = countries.find(c => c.code == parsed.data)
									country && Object.assign(newData.utilities, { countryData: country })

									handlePrisma(newData)
								}
							}}
							displayValue={(value: string | null) => value?.toString()}>
							{country => (
								<ComboboxOption
									value={country}
									key={country}>
									<ComboboxLabel>{country}</ComboboxLabel>
									<ComboboxDescription>
										{countries.find(c => c.code == country)?.name ?? country}
									</ComboboxDescription>
								</ComboboxOption>
							)}
						</Combobox>
					</InputGroup>
				</OverviewField>
				{/* ? OFFICIAL NAME */}
				<OverviewField
					label='Official Name'
					required
					errorMessages={data.errors.name}>
					<InputGroup>
						<Icon
							IconName='RenameIcon'
							data-slot='icon'
						/>
						<Input
							invalid={data.errors.name.length > 0 ? true : undefined}
							defaultValue={data.query.name ?? undefined}
							name='pathwayOfficialName'
							onBlur={e => {
								handlePrisma(refresh(data, 'name', e.currentTarget.value))
								// onBlurDispatchStringField(
								// 	e.currentTarget.value,
								// 	pathwayData,
								// 	'name',
								// 	dispatchAction
								// )
							}}
						/>
					</InputGroup>
				</OverviewField>
				{/* ? OFFICIAL LINK */}
				<OverviewField
					label='Official Link'
					fieldProps={{
						className: 'col-span-full',
					}}
					required
					errorMessages={data.errors.link}>
					<FieldLink
						onBlur={newData => {
							const updatedData = { ...data }
							updatedData.errors.link = newData.errors ?? []
							newData.data && (updatedData.query.link = newData.data)
							handlePrisma(updatedData)
						}}
						errors={data.errors.link.length > 0}
						defaultValue={data.query.link ?? undefined}
						name='pathwayLink'
					/>
				</OverviewField>
				{/* ? DESCRIPTION */}
				<OverviewField
					fieldProps={{
						className: 'col-span-full',
					}}
					label='Description'
					required
					errorMessages={data.errors.description}>
					<Textarea
						invalid={data.errors.description.length > 0 ? true : undefined}
						defaultValue={data.query.description ?? undefined}
						name='pathwayDescription'
						onBlur={e => handlePrisma(refresh(data, 'description', e.currentTarget.value))}
					/>
				</OverviewField>
			</FieldGroup>
		</FormSection>
	)
}
