import { FormSection } from '@/admin/_components/_form/clientFieldset'
import { Field, Label } from '@/admin/_components/catalyst'
import {
	Combobox,
	ComboboxDescription,
	ComboboxLabel,
	ComboboxOption,
} from '@/admin/_components/catalyst/client/combobox'
import { Input, InputGroup } from '@/admin/_components/catalyst/input'
import { Textarea } from '@/admin/_components/catalyst/textarea'
import { FormError } from '@/admin/_components/FormError'
import { betaCountries } from '@/admin/pathways/_lib/constants'
import { refresh } from '@/admin/pathways/_lib/refresh'
import { type ElPrismaProps } from '@/admin/pathways/_lib/types'
import z from 'zod'
import { Icon } from '~/components/Icon'
import type { Country, Currency } from '~/server/prisma/generated/browser'
import { FieldLink } from './FieldLink'

export const OverviewSection = ({
	data,
	handlePrisma,
	countries,
	showDefaults,
	...props
}: ElPrismaProps & {
	countries: Array<
		Country & {
			currencies: Currency[]
		}
	>
}) => {
	return (
		<FormSection
			title='Overview'
			aria-label='Pathway Overview'>
			<FormSection.Legend description='This section collects the basic information about the pathway. Please ensure that all information is accurate and corresponds to official sources where applicable.'>
				Overview
			</FormSection.Legend>
			<FormSection.Details className='gap-x-8 sm:grid-cols-2'>
				{/* ? COUNTRY ID */}
				<Field>
					<Label required>Country ID</Label>
					<InputGroup>
						<Icon
							IconName='GlobeStandIcon'
							data-slot='icon'
						/>
						<Combobox
							defaultValue={showDefaults ? data.query.countryCode : undefined}
							invalid={(data.errors?.countryCode.length ?? 0 > 0) ? true : undefined}
							name='countryCode'
							options={countries
								.filter(c => betaCountries.findIndex(b => b.code == c.code) != -1)
								.sort((a, b) => a.code.localeCompare(b.code))
								.map(c => c.code)}
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
							readOnly={props.readOnly}
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
				</Field>
				{/* ? OFFICIAL NAME */}
				<Field readOnly={props.readOnly}>
					<Label required>Official Name</Label>
					<InputGroup>
						<Icon
							IconName='RenameIcon'
							data-slot='icon'
						/>
						<Input
							readOnly={props.readOnly}
							invalid={data.errors.name.length > 0 ? true : undefined}
							name='pathwayOfficialName'
							onBlur={e => {
								handlePrisma(refresh(data, 'name', e.currentTarget.value))
							}}
							defaultValue={showDefaults ? data.query.name : undefined}
						/>
					</InputGroup>
					<FormError message={data.errors.name} />
				</Field>
				{/* ? OFFICIAL LINK */}
				<Field
					className='col-span-full'
					readOnly={props.readOnly}>
					<Label required>Official Link</Label>
					<FieldLink
						readOnly={props.readOnly}
						onBlur={newData => {
							const updatedData = { ...data }
							updatedData.errors.link = newData.errors ?? []
							newData.data && (updatedData.query.link = newData.data)
							handlePrisma(updatedData)
						}}
						errors={data.errors.link.length > 0}
						name='pathwayLink'
						defaultValue={showDefaults ? data.query.link : undefined}
					/>
					<FormError message={data.errors.link} />
				</Field>
				{/* ? DESCRIPTION */}
				<Field
					readOnly={props.readOnly}
					className='col-span-full'>
					<Label required>Description</Label>
					<Textarea
						readOnly={props.readOnly}
						invalid={data.errors.description.length > 0 ? true : undefined}
						name='pathwayDescription'
						onBlur={e => handlePrisma(refresh(data, 'description', e.currentTarget.value))}
						defaultValue={showDefaults ? data.query.description : undefined}
					/>
					<FormError message={data.errors.description} />
				</Field>
			</FormSection.Details>
		</FormSection>
	)
}
