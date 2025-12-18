import { AddButton, Button, SubSectionFieldset } from '@/admin/_components'
import { FormSection } from '@/admin/_components/_form/clientFieldset'
import { Field, Input, Label, Select, Strong, Textarea } from '@/admin/_components/catalyst/'
import type { ChangeEvent } from 'react'
import { Icon } from '~/components'
import type { Documents } from '~/server/prisma/generated'
import { document, FieldCost, FieldLink, type ElPrismaProps } from '../..'

const DocumentType = ({
	doc,
	documentTypes,
	data,
	handlePrisma,
}: ElPrismaProps & {
	documentTypes: Documents[]
	doc: Query['query']['documents'][number]
}) => {
	const showPlaceholder = typeof doc.documentId != 'number'
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		handlePrisma(
			document(
				data,
				'update',
				{
					...doc,
					documentId: Number(e.currentTarget.value),
				},
				doc.id
			)
		)
	}

	return (
		<Field>
			<Label required>Type</Label>
			<Select
				placeholder={{
					label: 'Select a document type',
					value: '',
					selected: showPlaceholder,
				}}
				onChange={handleChange}>
				{documentTypes.map(dt => (
					<option
						key={dt.id}
						value={dt.id}>
						{dt.name}
					</option>
				))}
			</Select>
		</Field>
	)
}

export const Documentation = ({
	documentTypes,
	data,
	handlePrisma,
}: ElPrismaProps & {
	documentTypes: Documents[]
}) => {
	const baseData = { ...data }

	return (
		<FormSection aria-label='Documentation'>
			<FormSection.Legend description='This section outlines the required documentation for the pathway application. Please ensure that all necessary documents are listed to facilitate a smooth application process.'>
				Documentation
			</FormSection.Legend>
			<FormSection.Details>
				{baseData.query.documents?.map(n => (
					<SubSectionFieldset key={n.id}>
						<SubSectionFieldset.Legend>
							<span>
								Document ID: <Strong className='text-interactive'>{n.id}</Strong>
							</span>
							<Button
								type='button'
								iconOnly
								className='absolute right-8 mx-auto rounded-full px-1.5 py-0'
								onClick={() => {
									handlePrisma(document(data, 'remove', undefined, n.id))
								}}>
								<Icon
									IconName='TrashXIcon'
									className='size-4 text-red-600 hover:text-red-800 sm:size-6'
									data-slot='icon'
									solid
								/>
							</Button>
						</SubSectionFieldset.Legend>
						<SubSectionFieldset.Details className='gap-x-8 sm:grid-cols-2'>
							{/* ! TYPE */}
							<DocumentType
								doc={n}
								documentTypes={documentTypes}
								data={data}
								handlePrisma={handlePrisma}
							/>
							{/* ! COST */}
							<Field>
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
							<Field>
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
							<Field>
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

							{/* ! DESCRIPTION */}
							<Field className='col-span-full'>
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
						</SubSectionFieldset.Details>
					</SubSectionFieldset>
				))}

				<AddButton
					onClick={() => {
						handlePrisma(document(data, 'add'))
					}}>
					Document
				</AddButton>
			</FormSection.Details>
		</FormSection>
	)
}
