import {
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	Label,
} from '@/admin/_components/catalyst'
import type { ElPrismaProps } from '..'

export const Renewable = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<>
			<span
				data-slot='control'
				className='flex flex-col space-y-6 gap-x-8 md:grid-cols-2 md:flex-row'>
				<CheckboxGroup>
					<CheckboxField>
						<Checkbox
							color='brand'
							checked={data.piplines.renewal}
							onChange={() => {
								handlePrisma({
									...data,
									piplines: {
										...data.piplines,
										renewal: !data.piplines.renewal,
									},
								})
							}}
						/>
						<Label>Pathway is Renewable</Label>
						<Description>
							The visa can be renewed at least once after the initial duration expires for any
							reason.
						</Description>
					</CheckboxField>
				</CheckboxGroup>
			</span>
		</>
	)
}
