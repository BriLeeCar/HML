import { Textarea } from '@/admin/_components/catalyst'
import { refresh } from '../..'
import { OverviewField } from './OverviewField'

export const OverviewDescription = ({
	data,
	handlePrisma,
}: {
	data: Query
	handlePrisma: (data: Query) => void
}) => {
	return (
		<OverviewField
			fieldProps={{
				className: 'col-span-full',
			}}
			label='Description'
			required
			errorMessages={data.errors.description}>
			<Textarea
				invalid={data.errors.description.length > 0 ? true : undefined}
				name='pathwayDescription'
				onBlur={e => handlePrisma(refresh(data, 'description', e.currentTarget.value))}
			/>
		</OverviewField>
	)
}
