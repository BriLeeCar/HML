import { FieldLink } from '../..'
import { OverviewField } from './OverviewField'

export const OverviewLink = ({
	data,
	handlePrisma,
}: {
	data: Query
	handlePrisma: (data: Query) => void
}) => {
	return (
		<OverviewField
			label='Official Link'
			fieldProps={{
				className: 'col-span-full',
			}}
			required
			errorMessages={data.errors.link}>
			<FieldLink
				onBlur={newData => {
					const updatedData = { ...data }
					updatedData.errors.link = newData.errors ?? []
					newData.data && (updatedData.query.link = newData.data)
					handlePrisma(updatedData)
				}}
				errors={data.errors.link.length > 0}
				defaultValue={data.query.link ?? undefined}
				name='pathwayLink'
			/>
		</OverviewField>
	)
}
