import { FormSection } from '@/admin/_components'
import {
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	FieldGroup,
	Label,
	Textarea,
} from '@/admin/_components/catalyst'
import { type ReactNode } from 'react'
import { refresh, type ElPrismaProps } from '../..'
import { Limitations } from './Limitations'
import { NationalityRestrictionsCB } from './NationalityRestrictionsCB'

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
