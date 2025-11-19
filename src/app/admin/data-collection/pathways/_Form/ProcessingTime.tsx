'use client'
import { Error, Field } from '..'
import { FormSubSection } from './Base'
import { MinMaxTimeFieldGroup } from './MinMaxTimeFieldGroup'

export const ProcessingTime = ({
	pathwayData,
	dispatchAction,
}: ElProps) => {
	return (
		<FormSubSection
			aria-label='Processing Time'
			legend='Processing Time'
			description={
				'Please provide the processing time for the application of this pathway using whole numbers only. Change the unit of measurement (UOM) as needed.'
			}>
			<Field>
				<Error message={pathwayData.processingTime.error} />
			</Field>

			<MinMaxTimeFieldGroup
				pathwayData={pathwayData}
				dispatchAction={dispatchAction}
				field='processingTime'
				className='grid gap-x-4 md:grid-cols-3'
			/>
		</FormSubSection>
	)
}
