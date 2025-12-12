import { Input, InputGroup } from '@/admin/_components/catalyst'
import { Icon } from '~/components/Icon'
import { refresh } from '../..'
import { OverviewField } from './OverviewField'

export const OverviewOfficialName = ({
	data,
	handlePrisma,
}: {
	data: Query
	handlePrisma: (data: Query) => void
}) => {
	return (
		<OverviewField
			label='Official Name'
			required
			errorMessages={data.errors.name}>
			<InputGroup>
				<Icon
					IconName='RenameIcon'
					data-slot='icon'
				/>
				<Input
					invalid={data.errors.name.length > 0 ? true : undefined}
					defaultValue={data.query.name ?? undefined}
					name='pathwayOfficialName'
					onBlur={e => {
						handlePrisma(refresh(data, 'name', e.currentTarget.value))
					}}
				/>
			</InputGroup>
		</OverviewField>
	)
}
