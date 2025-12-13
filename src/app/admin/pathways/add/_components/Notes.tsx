import { AddButton, RemoveButton, RemoveButtonWrapper } from '@/admin/_components'
import { Field, FieldGroup, Label, Textarea } from '@/admin/_components/catalyst'
import { note, type ElPrismaProps } from '..'

export const Notes = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<FieldGroup>
			{data.query.notes?.map(n => {
				return (
					<FieldGroup
						key={n.counter}
						className='ml-6 grid grid-cols-[auto_max-content] border-b-2 border-[#F0EBF1] pt-4 pb-8 *:grid *:grid-cols-[.15fr_auto] *:items-baseline *:gap-x-8 last:border-0 last:pb-0 *:last:grid-cols-1 md:pl-6 dark:border-b dark:border-current/10'>
						<Field className='col-start-1 mb-1'>
							<Label>Details</Label>
							<Textarea
								name={`noteDetails-${n.counter}`}
								className='mt-1'
								onBlur={e => {
									handlePrisma(
										note(
											data,
											'notes',
											'update',
											{ note: e.target.value, counter: n.counter },
											n.counter
										)
									)
								}}
							/>
						</Field>
						<RemoveButtonWrapper>
							<RemoveButton
								onClick={() => {
									handlePrisma(note(data, 'notes', 'remove', undefined, n.counter))
								}}
							/>
						</RemoveButtonWrapper>
					</FieldGroup>
				)
			})}

			<AddButton
				onClick={() => {
					handlePrisma(note(data, 'notes', 'add'))
				}}>
				Note
			</AddButton>
		</FieldGroup>
	)
}
