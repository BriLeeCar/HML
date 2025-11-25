import { Button, Field, FieldGroup, Input, InputGroup, Label } from '@/data-collection/pathways'
import { Icon } from '~/components/Icon'

export const Documentation = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = { ...pathwayData.documents }
	return (
		<FieldGroup>
			{baseData.value.map(n => (
				<FieldGroup
					key={n.counter}
					className='ml-6 grid grid-cols-[auto_auto_0.15fr] gap-x-4 border-b-2 border-[#F0EBF1] pt-0 pb-4 *:flex *:items-baseline *:gap-x-4 last:border-0 last:pb-0 md:pl-6 dark:border-b dark:border-current/10'>
					<Field>
						<Label>Document</Label>
						<Input
							name={`documentDetails-${n.counter}`}
							className='mt-1'
							defaultValue={n.title}
							onBlur={e => {
								dispatchAction({
									type: 'update',
									field: 'documents',
									payload: {
										counter: n.counter,
										value: {
											...n,
											title: e.currentTarget.value,
										},
									},
								})
							}}
						/>
					</Field>
					<Field>
						<Label>Cost</Label>
						<InputGroup>
							{pathwayData.costUom.value.currencySymbol && (
								<span
									data-slot='icon'
									className='text-xs'>
									{pathwayData.costUom.value.currencySymbol}
								</span>
							)}
							<Input
								type='number'
								min={0}
								step={0.01}
								defaultValue={n.cost}
								onBlur={e => {
									dispatchAction({
										type: 'update',
										field: 'documents',
										payload: {
											counter: n.counter,
											value: {
												...n,
												cost: parseFloat(e.currentTarget.value),
											},
										},
									})
								}}
							/>
						</InputGroup>
					</Field>
					<span className='mt-[0.25lh] mb-1 flex w-full justify-center pl-2 align-middle'>
						<Button
							type='button'
							iconOnly
							className='mx-auto rounded-full px-1.5 py-0'
							onClick={() => {
								dispatchAction({
									type: 'delete',
									field: 'documents',
									payload: n.counter,
								})
							}}>
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
				innerButton
				onClick={() => {
					dispatchAction({
						type: 'add',
						field: 'documents',
						payload: null,
					})
				}}>
				<Icon
					IconName='PlusCircleIcon'
					className='h-4 w-4 text-current/75'
					data-slot='icon'
					solid
				/>
				Add Document
			</Button>
		</FieldGroup>
	)
}
