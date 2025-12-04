import {
	AddButton,
	Field,
	FieldGroup,
	Label,
	RemoveButton,
	RemoveButtonWrapper,
	Textarea,
	type ElPrismaProps,
} from '@/data-collection/pathways'
import { note } from './refresh'

export const Notes = ({ data, handlePrisma }: ElPrismaProps) => {
	const workingData = { ...data }

	return (
		<FieldGroup>
			{workingData.query.notes?.map(n => {
				return (
					<FieldGroup
						key={n.counter}
						className='ml-6 grid grid-cols-[auto_max-content] border-b-2 border-[#F0EBF1] pt-4 pb-8 *:grid *:grid-cols-[.15fr_auto] *:items-baseline *:gap-x-8 last:border-0 last:pb-0 *:last:grid-cols-1 md:pl-6 dark:border-b dark:border-current/10'>
						<Field className='col-start-1 mb-1'>
							<Label>Details</Label>
							<Textarea
								defaultValue={n.note}
								name={`noteDetails-${n.counter}`}
								className='mt-1'
								onBlur={e => {
									handlePrisma(
										note(
											workingData,
											'notes',
											'update',
											{ note: e.target.value, counter: n.counter },
											n.counter
										)
									)
									// console.log('thisField', thisField)
									// if (thisField != -1) {
									// 	const newData = { ...workingData }
									// 	console.log('thisField', thisField)

									// 	newData.query.notes[thisField].note = e.target.value

									// 	handlePrisma(newData)
									// }
								}}
							/>
						</Field>
						<RemoveButtonWrapper>
							<RemoveButton
								onClick={() => {
									handlePrisma(note(workingData, 'notes', 'remove', undefined, n.counter))
								}}
							/>
						</RemoveButtonWrapper>
					</FieldGroup>
				)
			})}

			<AddButton
				onClick={() => {
					handlePrisma(note(workingData, 'notes', 'add'))
				}}>
				Note
			</AddButton>
		</FieldGroup>
	)
}
