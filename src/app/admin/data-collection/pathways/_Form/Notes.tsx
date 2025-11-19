import { Icon } from '~/components/Icon'
import { Button, Field, FieldGroup, Label, Textarea } from '.'

export const Notes = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = { ...pathwayData.notes }
	return (
		<FieldGroup>
			{baseData.value.map((n) => (
				<FieldGroup
					key={n.counter}
					className='ml-6 grid grid-cols-[auto_max-content] border-b-2 border-[#F0EBF1] pt-4 pb-8 pl-6 *:grid *:grid-cols-[.15fr_auto] *:items-baseline *:gap-x-8 last:border-0 last:pb-0 *:last:grid-cols-1'>
					<Field className='col-start-1 mb-1'>
						<Label>Details</Label>
						<Textarea
							name={`noteDetails-${n.counter}`}
							className='mt-1'
							onBlur={(e) => {
								baseData.value[n.counter].note = e.currentTarget.value
								dispatchAction({
									type: 'setNotes',
									field: 'notes',
									payload: baseData,
								})
							}}
						/>
					</Field>
					<span className='col-start-2 row-start-1 row-end-3 mt-[0.25lh] flex w-full justify-center pl-2 align-middle'>
						<Button
							type='button'
							iconOnly
							className='mx-auto rounded-full px-1.5 py-0'
							onClick={() =>
								dispatchAction({
									type: 'deleteNote',
									field: 'notes',
									payload: n.counter,
								})
							}>
							<Icon
								IconName='XIcon'
								className='h-fit w-fit text-red-600 hover:text-red-800'
								data-slot='icon'
								solid
							/>
						</Button>
					</span>
				</FieldGroup>
			))}

			<Button
				type='button'
				size='sm'
				className='my-8 flex w-full items-center justify-center gap-x-2 bg-[#F0EBF1] text-center text-[#74447E] hover:bg-[#74447E] hover:text-[#F0EBF1] focus-visible:outline-offset-1 focus-visible:outline-[#47274E] dark:bg-[#47274E] dark:text-[#F0EBF1] dark:hover:bg-[#74447E] dark:hover:text-[#F0EBF1]'
				onClick={() => {
					baseData.value.push({
						counter: baseData.counter,
						note: '',
					})
					baseData.counter += 1
					dispatchAction({
						type: 'setNotes',
						field: 'notes',
						payload: baseData,
					})
				}}>
				<Icon
					IconName='PlusCircleIcon'
					className='h-4 w-4 text-current/75'
					data-slot='icon'
					solid
				/>
				Add Note
			</Button>
		</FieldGroup>
	)
}
