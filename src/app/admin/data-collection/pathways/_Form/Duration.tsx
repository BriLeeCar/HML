import { FieldGroup } from '@/data-collection/pathways'
import {
	FormSubSection,
	MinMaxTimeFieldGroup,
	type ElPrismaProps,
} from '@/data-collection/pathways/_Form'

export const Duration = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<FormSubSection
			aria-label='Visa Duration'
			legend='Duration'
			description={
				'Please provide the duration of the visa/pathway. If the visa can be renewed, please indicate so by checking the appropriate box(es).'
			}>
			<FieldGroup>
				<MinMaxTimeFieldGroup
					data={data}
					handlePrisma={handlePrisma}
					field='duration'
					className='grid gap-x-4 md:grid-cols-3'
					error={data.errors.duration.base?.length > 0}
				/>
			</FieldGroup>
		</FormSubSection>
	)
}
