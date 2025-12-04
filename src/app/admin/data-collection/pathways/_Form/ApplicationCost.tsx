import { Error, Field, Strong } from '@/data-collection/pathways'

import {
	FormSubSection,
	MinMaxCostFieldGroup,
	type ElPrismaProps,
} from '@/data-collection/pathways/_Form'

export const ApplicationCost = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Array<Queried.Country.WithRelations>
}) => {
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
			<MinMaxCostFieldGroup
				error={data.errors.cost.base?.length > 0}
				data={data}
				handlePrisma={handlePrisma}
				countries={countries}
			/>
			<Field className='text-center font-medium italic *:text-sm/12'>
				<Error message={data.errors.cost.base} />
			</Field>
		</FormSubSection>
	)
}
