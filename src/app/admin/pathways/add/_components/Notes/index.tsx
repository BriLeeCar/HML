import { AddButton, RemoveButton, RemoveButtonWrapper } from '@/admin/_components'
import { FormSection } from '@/admin/_components/_form/clientFieldset'
import { Field, Label, Textarea } from '@/admin/_components/catalyst'
import { note, type ElPrismaProps } from '../..'

export const Notes = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<FormSection
			title='Additional Notes'
			aria-label='Additional Notes'>
			<FormSection.Legend
				description={
					'Please provide any additional notes or important information about the pathway that may not have been covered in the previous sections. This could include special conditions, exceptions, or other relevant details.'
				}>
				Additional Notes
			</FormSection.Legend>
			<FormSection.Details>
				{data.query.notes?.map(n => {
					return (
						<div
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
						</div>
					)
				})}

				<AddButton
					onClick={() => {
						handlePrisma(note(data, 'notes', 'add'))
					}}>
					Note
				</AddButton>
			</FormSection.Details>
		</FormSection>
	)
}
