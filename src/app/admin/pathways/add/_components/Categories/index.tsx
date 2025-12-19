import { FormGroupError } from '@/admin/_components'
import { FormSection } from '@/admin/_components/_form/clientFieldset'
import { CheckboxGroup } from '@/admin/_components/catalyst/'
import { cn } from '~/lib/cn'
import type { PathwayTypeRecursive } from '~/server/api/routers'
import { type ElPrismaProps } from '../..'
import { CategoryCheckboxes } from './CB'

export type Categories = PathwayTypeRecursive & { parentId?: string | null }

export const CategorySection = ({
	data,
	handlePrisma,
	pathwayTypes,
}: ElPrismaProps & {
	pathwayTypes: Categories[]
}) => {
	const handleCheck = (id: number, status: boolean) => {
		const newData = { ...data }
		if (data.query.categories == undefined) {
			newData.query.categories = []
		}
		const newCategories = [...data.query.categories, id].filter(c => {
			if (status) return true
			return c !== id
		})

		newData.query.categories = newCategories
		handlePrisma(newData)
	}

	return (
		<FormSection aria-label='Pathway Categories'>
			<FormSection.Legend
				description={
					"To best classify this pathway, please fill out the category information below. We use this to help users filter and find relevant pathways, as well as suggest similar pathways they might be interested in but haven't discovered yet."
				}>
				Categories
			</FormSection.Legend>
			<FormSection.Details>
				{data.errors.categories.length > 0 && <FormGroupError message={data.errors.categories} />}
				{/* ? BASE CATEGORIES */}
				<Group
					handleCheck={handleCheck}
					checkBoxes={pathwayTypes.sort((a, b) =>
						a.name == 'Other' ? 1
						: b.name == 'Other' ? -1
						: a.name.localeCompare(b.name)
					)}
					className='pl-0'
				/>
			</FormSection.Details>
		</FormSection>
	)
}

export const Group = ({
	checkBoxes,
	handleCheck,
	...props
}: Props & {
	handleCheck: (id: number, status: boolean) => void
	checkBoxes: Categories[]
}) => {
	return (
		<CheckboxGroup
			aria-required
			{...props}
			className={cn(
				'col-span-2 grid w-full grid-cols-1 justify-between gap-y-8 pl-10 md:grid-cols-2',
				props.className
			)}>
			{checkBoxes
				.sort((a, b) => {
					const childCompare = a.children.length - b.children.length
					if (childCompare !== 0) return childCompare
					return a.name.localeCompare(b.name)
				})
				.map(child => (
					<CategoryCheckboxes
						onChange={e => {
							handleCheck(child.id, e)
						}}
						handleCheck={handleCheck}
						key={child.id}
						cb={child}
					/>
				))}
		</CheckboxGroup>
	)
}
