import { Error, Field } from '..'
import { Strong } from '../../_components/text'
import { FormSubSection } from './Base'
import { MinMaxCostFieldGroup } from './MinMaxCostFieldGroup'

export const ApplicationCost = ({
	pathwayData,
	dispatchAction,
}: ElProps) => {
	return (
		<FormSubSection
			aria-label='Cost'
			legend='Cost'
			description={
				<>
					Please provide the cost associated with applying for this
					pathway.{' '}
					<Strong className='text-muted-foreground'>
						Keep in mind, this will be using the UOM of the country's
						currency, as was provided above.
					</Strong>
				</>
			}>
			<Field>
				<Error message={pathwayData.processingTime.error} />
			</Field>

			<MinMaxCostFieldGroup
				pathwayData={pathwayData}
				dispatchAction={dispatchAction}
			/>
		</FormSubSection>
	)
}
