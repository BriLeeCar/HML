import { FormError, FormSubSection } from '@/admin/_components'
import { Field } from '@/admin/_components/catalyst'
import { MinMaxCostFieldGroup, type ElPrismaProps } from '../..'

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
			tooltip={
				'If the Max cost is left blank, it will be assumed that the cost is a fixed value (Min Value).'
			}
			description='The cost associated with applying for this pathway. Do not include costs for documents as those will be covered in the Documentation section.'>
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
