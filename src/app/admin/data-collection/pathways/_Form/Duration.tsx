import { FieldGroup } from '..'
import { FormSubSection } from './Base'
import { MinMaxTimeFieldGroup } from './MinMaxTimeFieldGroup'

export const Duration = ({
	pathwayData,
	dispatchAction,
}: ElProps) => {
	return (
		<FormSubSection
			aria-label='Visa Duration'
			legend='Duration'
			description={
				'Please provide the duration of the visa/pathway. If the visa can be renewed, please indicate so by checking the appropriate box(es).'
			}>
			<FieldGroup>
				<MinMaxTimeFieldGroup
					pathwayData={pathwayData}
					dispatchAction={dispatchAction}
					field='duration'
					className='grid gap-x-4 md:grid-cols-3'
				/>
			</FieldGroup>
		</FormSubSection>
	)
}
