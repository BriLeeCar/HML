import { Button, Field, FieldGroup, Input, Label } from '@/data-collection/pathways'
import { Icon } from '~/components/Icon'

export const Documentation = ({ pathwayData, dispatchAction }: ElProps) => {
	const baseData = { ...pathwayData.documents }
	return (
		<FieldGroup>
			{baseData.value.map(n => (
				<FieldGroup
					key={n.counter}
					className='ml-6 grid grid-cols-[auto_auto_0.15fr] gap-x-4 border-b-2 border-[#F0EBF1] pt-0 pb-4 pl-6 *:flex *:items-baseline *:gap-x-4 last:border-0 last:pb-0 dark:border-b-1 dark:border-current/10'>
					<Field>
						<Label>Document</Label>
						<Input
							name={`documentDetails-${n.counter}`}
							className='mt-1'
							defaultValue={n.title}
							onBlur={e => {
								baseData.value[n.counter].title = e.currentTarget.value
								dispatchAction({
									type: 'setDocuments',
									field: 'documents',
									payload: baseData,
								})
							}}
						/>
					</Field>
					<Field>
						<Label>Cost</Label>
						<Input
							type='number'
							min={0}
							step={0.01}
							defaultValue={n.cost}
						/>
					</Field>
					<span className='mt-[0.25lh] mb-1 flex w-full justify-center pl-2 align-middle'>
						<Button
							type='button'
							iconOnly
							className='mx-auto rounded-full px-1.5 py-0'
							onClick={() => {
								dispatchAction({
									type: 'deleteDocuments',
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
					baseData.value.push({
						counter: baseData.counter,
						title: '',
						cost: 0,
						error: [],
					})
					baseData.counter += 1
					dispatchAction({
						type: 'setDocuments',
						field: 'documents',
						payload: baseData,
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
