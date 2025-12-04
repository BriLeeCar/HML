import {
	Button,
	Field,
	FieldGroup,
	Input,
	InputGroup,
	Label,
	Select,
	Textarea,
	type ElPrismaProps,
} from '@/data-collection/pathways'
import z from 'zod'
import { Icon } from '~/components/Icon'
import type { Documents } from '~/server/prisma/generated/browser'
import { FieldCost } from './CostField'
import { document } from './refresh'

export const Documentation = ({
	documentTypes,
	data,
	handlePrisma,
}: ElPrismaProps & {
	documentTypes: Documents[]
}) => {
	const baseData = { ...data }
	return (
		<FieldGroup>
			{baseData.query.documents?.map(n => (
				<FieldGroup
					key={n.id}
					className='grid grid-cols-[auto_auto_auto_0.15fr] gap-x-4 border-b-2 border-[#F0EBF1] pt-0 pb-4 *:flex *:items-baseline *:gap-x-4 last:border-0 last:pb-0 dark:border-b dark:border-current/10'>
					{/* ! TYPE */}
					<Field>
						<Label required>Type</Label>
						<Select
							placeholder={{
								label: 'Select a document type',
								value: '',
								selected: typeof n.documentId != 'number',
							}}
							onChange={e => {
								handlePrisma(
									document(
										data,
										'update',
										{
											...n,
											documentId: Number(e.currentTarget.value),
										},
										n.id
									)
								)
							}}
							defaultValue={n.documentId?.toString()}>
							{documentTypes.map(dt => (
								<option
									key={dt.id}
									value={dt.id}>
									{dt.name}
								</option>
							))}
						</Select>
					</Field>
					{/* ! TITLE */}
					<Field>
						<Label>Title</Label>
						<Input
							name={`documentTitle-${n.id}`}
							className='mt-1'
							defaultValue={n.title ?? undefined}
							placeholder='ex: Form I-20'
							onBlur={e => {
								handlePrisma(
									document(
										data,
										'update',
										{
											...n,
											title: e.currentTarget.value,
										},
										n.id
									)
								)
							}}
						/>
					</Field>
					{/* ! COST */}
					<Field className='row-start-2'>
						<Label>Cost</Label>
						<FieldCost
							data={data}
							cost={n.cost}
							onBlur={e => {
								handlePrisma(
									document(
										data,
										'update',
										{
											...n,
											cost: Number(e.currentTarget.value),
										},
										n.id
									)
								)
							}}
						/>
					</Field>
					{/* ! LINK */}
					<Field className='row-start-2'>
						<Label>Link</Label>
						<InputGroup>
							{data.query.currencyCode && (
								<span
									data-slot='icon'
									className='text-xs'>
									{data.query.currencyCode}
								</span>
							)}
							<Input
								type='text'
								defaultValue={n.link || undefined}
								onBlur={e => {
									if (z.url().safeParse(e.currentTarget.value).success) {
										baseData.errors.link = []
										baseData.query.link = e.currentTarget.value
									} else {
										baseData.errors.link = ['Invalid URL']
									}
									handlePrisma({ ...baseData })
								}}
							/>
						</InputGroup>
					</Field>
					{/* ! DELETE BUTTON */}
					<span className='mt-[0.25lh] mb-1 flex w-full justify-center pl-2 align-middle'>
						<Button
							type='button'
							iconOnly
							className='mx-auto rounded-full px-1.5 py-0'
							onClick={() => {
								handlePrisma(document(data, 'remove', undefined, n.id))
							}}>
							<Icon
								IconName='XIcon'
								className='h-fit w-fit text-red-600 hover:text-red-800'
								data-slot='icon'
								solid
							/>
						</Button>
					</span>
					{/* ! DESCRIPTION */}
					<Field className='col-span-3 -mt-3 flex-col pl-12 *:mt-0!'>
						<Label className='sr-only'>Notes</Label>
						<Textarea
							defaultValue={n.description || undefined}
							placeholder='Any special notes for this document can be written here'
							onBlurCapture={e => {
								handlePrisma(
									document(
										data,
										'update',
										{
											...n,
											description: e.currentTarget.value,
										},
										n.id
									)
								)
							}}
						/>
					</Field>
				</FieldGroup>
			))}

			<Button
				type='button'
				size='sm'
				innerButton
				onClick={() => {
					handlePrisma(document(data, 'add'))
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
