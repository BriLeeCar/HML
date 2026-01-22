import { FormSection } from '@/admin/_components/_form/clientFieldset'
import { Checkbox, CheckboxField, Description, Label, Textarea } from '@/admin/_components/catalyst'
import { refresh } from '@/admin/pathways/_lib/refresh'
import type { ElPrismaProps } from '@/admin/pathways/_lib/types'
import { type ReactNode } from 'react'
import { Limitations } from './Limitations'
import { NationalityRestrictionsCB } from './NationalityRestrictionsCB'

export const RestrictionsOpportunities = ({
	data,
	handlePrisma,
	countries,
	type = 'add',
	canEdit,
}: ElPrismaProps & {
	countries: Array<{ code: string; name: string }>
}) => {
	return (
		<FormSection aria-label='Restrictions & Opportunities'>
			<FormSection.Legend
				description={
					'This section gathers any specific limitations or requirements associated with the pathway. This may include eligibility criteria, nationality restrictions, or other important notes.'
				}>
				Restrictions & Opportunities
			</FormSection.Legend>
			<FormSection.Details>
				<NationalityRestrictionsCB
					data={data}
					handlePrisma={handlePrisma}
					countries={countries}
					type={type}
					canEdit={canEdit}
				/>
				<Limitations
					data={data}
					handlePrisma={handlePrisma}
					type={type}
					canEdit={canEdit}
				/>
				<RestrictionOpportunitiesCB
					label='Potentially Allows for Reunification'
					description='This pathway could be used to reunify family members under specific conditions.'
					field='reunification'
					data={data}
					handlePrisma={handlePrisma}
					defaultChecked={type == 'view' ? data.piplines.reunification : undefined}
					type={type}
					defaultNote={
						type == 'view' && data.piplines.reunification ? data.query.reunification : undefined
					}
					canEdit={canEdit}
				/>
				<RestrictionOpportunitiesCB
					label='Has a Route Towards Residency'
					description='This pathway may provide a route to permanent or long-term residency in the country.'
					field='residency'
					data={data}
					handlePrisma={handlePrisma}
					type={type}
					defaultChecked={type == 'view' ? data.piplines.residency : undefined}
					defaultNote={type == 'view' && data.piplines.residency ? data.query.residency : undefined}
					canEdit={canEdit}
				/>
				<RestrictionOpportunitiesCB
					label='Has a Route Towards Citizenship'
					description='This pathway may provide a route to citizenship in the country.'
					field='citizenship'
					data={data}
					handlePrisma={handlePrisma}
					defaultChecked={type == 'view' ? data.piplines.citizenship : undefined}
					defaultNote={
						type == 'view' && data.piplines.citizenship ? data.query.citizenship : undefined
					}
					canEdit={canEdit}
				/>
			</FormSection.Details>
		</FormSection>
	)
}

const RestrictionOpportunitiesCB = <B extends Exclude<keyof Query['piplines'], 'renewal'>>({
	label,
	description,
	field,
	data,
	handlePrisma,
	type = 'add',
	defaultNote,
	canEdit,
	...props
}: ElPrismaProps
	& Props<typeof Textarea> & {
		cbChecked?: boolean
		defaultNote?: string
		label: string
		description: ReactNode
		field: B
	}) => {
	return (
		<>
			<CheckboxField>
				<Checkbox
					disabled={!canEdit}
					name={field}
					color='brand'
					defaultChecked={data.piplines[field]}
					onChange={e => {
						const updated = { ...data }
						// @ts-expect-error mistyped
						updated.piplines[field] = e as boolean
						handlePrisma(updated)
					}}
				/>
				<Label>{label}</Label>
				<Description>{description}</Description>
			</CheckboxField>
			{data.piplines[field] == true && (
				<Textarea
					disabled={!canEdit}
					name={`${field}Notes`}
					defaultValue={type == 'view' ? defaultNote : undefined}
					{...props}
					className='mx-auto -mt-4 mb-8 w-full max-w-lg'
					onBlur={e => {
						handlePrisma(refresh(data, field as keyof PrismaPathway, e.target.value))
					}}
				/>
			)}
		</>
	)
}
