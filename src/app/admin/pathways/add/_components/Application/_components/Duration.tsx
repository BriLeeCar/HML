import { DurationGroup } from '../..'

export const Duration = ({
	data,
	handlePrisma,
}: {
	data: Query
	handlePrisma: (data: Query) => void
}) => {
	return (
		<DurationGroup
			data={data}
			handlePrisma={handlePrisma}
			fieldKey='duration'
			legend='Duration'
			description='Please provide the duration of the visa/pathway.'
		/>
	)
}
