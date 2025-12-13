import { Button } from '@/admin/_components'
import { Field, FieldGroup, Input, Label, Select, Textarea } from '@/admin/_components/catalyst/'
import { Icon } from '~/components'
import { document, FieldCost, FieldLink, type ElPrismaProps } from '..'

export const Documentation = ({
	documentTypes,
	data,
	handlePrisma,
}: ElPrismaProps & {
	documentTypes: Queried.Models.Documents[]
}) => {
	const baseData = { ...data }

	// approx width in rems
	const labelWidth =
		Math.max(...['type', 'cost', 'title', 'link', 'notes'].map(x => x.length)) * 0.6 + 1.2

	return (
		<FieldGroup>
			{baseData.query.documents?.map(n => (
				<FieldGroup
					key={n.id}
					className='grid grid-cols-[auto_auto_0.15fr] *:items-baseline *:gap-x-4'>
					{/* ! TYPE */}
					<Field
						className='grid text-end'
						style={{
							gridTemplateColumns: `${labelWidth}rem auto`,
						}}>
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
							}}>
							{documentTypes.map(dt => (
								<option
									key={dt.id}
									value={dt.id}>
									{dt.name}
								</option>
							))}
						</Select>
					</Field>
					{/* ! COST */}
					<Field
						className='grid text-end'
						style={{
							gridTemplateColumns: `${labelWidth}rem auto`,
						}}>
						<Label>Cost</Label>
						<FieldCost
							className='w-full basis-full'
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
					{/* ! TITLE */}
					<Field
						className='row-start-2 grid text-end'
						style={{
							gridTemplateColumns: `${labelWidth}rem auto`,
						}}>
						<Label>Title</Label>
						<Input
							name={`documentTitle-${n.id}`}
							className='mt-1'
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
					{/* ! LINK */}
					<Field
						className='row-start-2 grid w-full text-end'
						style={{
							gridTemplateColumns: `${labelWidth}rem auto`,
						}}>
						<Label>Link</Label>
						<FieldLink
							className='w-full basis-full'
							onBlur={({ data: parsedData }) => {
								const parsed = { ...data }
								parsed.query.documents.forEach(doc => {
									if (doc == n) {
										doc.link = parsedData ?? null
									}
								})
								handlePrisma({
									...parsed,
								})
							}}
						/>
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
					<Field
						className='col-span-2 row-start-3 grid text-end *:mt-0!'
						style={{
							gridTemplateColumns: `${labelWidth}rem auto`,
						}}>
						<Label>Notes</Label>
						<Textarea
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
