import {
	AddButton,
	Field,
	FieldGroup,
	Label,
	RemoveButton,
	RemoveButtonWrapper,
	Textarea,
} from '@/data-collection/pathways'

export const Notes = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = { ...pathwayData.notes }

	return (
		<FieldGroup>
			{baseData.value.map(n => (
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
								const thisField = baseData.value.findIndex(f => f.counter === n.counter)
								if (thisField) {
									baseData.value[thisField].note = e.currentTarget.value
								}

								dispatchAction({
									type: 'update',
									field: 'notes',
									payload: {
										counter: n.counter,
										value: {
											note: e.currentTarget.value,
											error: [],
											counter: n.counter,
										},
									},
								})
							}}
						/>
					</Field>
					<RemoveButtonWrapper>
						<RemoveButton
							onClick={() =>
								dispatchAction({
									type: 'delete',
									field: 'notes',
									payload: n.counter,
								})
							}
						/>
					</RemoveButtonWrapper>
				</FieldGroup>
			))}

			<AddButton
				onClick={() =>
					dispatchAction({
						type: 'add',
						field: 'notes',
						payload: null,
					})
				}>
				Note
			</AddButton>
		</FieldGroup>
	)
}
