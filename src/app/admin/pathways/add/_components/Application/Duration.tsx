import { TimeFieldGroup, TimeSubSection } from '..'

export const Duration = ({
	data,
	handlePrisma,
}: {
	data: Query
	handlePrisma: (data: Query) => void
}) => {
	return (
		<TimeSubSection
			heading={{
				label: 'Visa Duration',
				legend: 'Duration',
				description:
					'Please provide the duration of the visa/pathway. If the visa can be renewed, please indicate so by checking the appropriate box(es).',
			}}
			data={data}
			handlePrisma={handlePrisma}
			field='duration'>
			<TimeFieldGroup
				data={data}
				handlePrisma={handlePrisma}
				field='duration'
			/>
		</TimeSubSection>
	)
}
