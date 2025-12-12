import { TimeFieldGroup, TimeSubSection } from '.'

export const ProcessingTime = ({
	data,
	handlePrisma,
}: {
	data: Query
	handlePrisma: (data: Query) => void
}) => {
	return (
		<TimeSubSection
			heading={{
				label: 'Processing Time',
				legend: 'Processing Time',
				description:
					'From application submission to decision, how long does it typically take to process this visa/pathway?',
			}}
			data={data}
			handlePrisma={handlePrisma}
			field='processTime'>
			<TimeFieldGroup
				data={data}
				handlePrisma={handlePrisma}
				field='processTime'
			/>
		</TimeSubSection>
	)
}
