import { DurationGroup } from '..'

export const ProcessingTime = ({
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
			fieldKey='processTime'
			description='From application submission to decision, how long does it typically take to process this visa/pathway?'
			legend='Processing Time'
		/>
	)
}
