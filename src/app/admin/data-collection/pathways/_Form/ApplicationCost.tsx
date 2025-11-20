import { Error, Field, Strong } from '@/data-collection/pathways'

import { FormSubSection, MinMaxCostFieldGroup } from '@/data-collection/pathways/_Form'

export const ApplicationCost = ({ pathwayData, dispatchAction }: ElProps) => {
	return (
		<FormSubSection
			aria-label='Cost'
			legend='Cost'
			description={
				<>
					Please provide the cost associated with applying for this pathway.{' '}
					<Strong className='text-muted-foreground'>
						Keep in mind, this will be using the UOM of the country's currency, as was provided
						above.
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
