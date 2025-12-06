import { FormError, FormSubSection } from '@/admin/_components'
import { Field, Strong } from '@/admin/_components/catalyst'
import { MinMaxCostFieldGroup, type ElPrismaProps } from '..'

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
				<FormError message={data.errors.cost.base} />
			</Field>
		</FormSubSection>
	)
}
