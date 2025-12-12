import { FormSection } from '@/admin/_components'
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
		const newCategories = [...data.query.categories]
			.map(p => {
				if (p.id == id) {
					return status ? p : false
				}
				return p
			})
			.filter(x => x != false)
		const thisCategory = pathwayTypes.find(c => c.id == id) as {
			name: string
			id: number
			description: string | null
			parentId: string | null
		}
		// @ts-expect-error IDK what is happening here
		thisCategory && status && newCategories.push(thisCategory)

		newData.query.categories = [...newCategories]
		console.log(newData)
		handlePrisma(newData)
	}

	if (data.query.categories?.length > 0) {
		console.log(
			'Selected Categories:',
			data.query.categories.map(c => c)
		)
	}

	return (
		<FormSection
			title='Categories'
			aria-label='Pathway Categories'
			description={
				"To best classify this pathway, please fill out the category information below. We use this to help users filter and find relevant pathways, as well as suggest similar pathways they might be interested in but haven't discovered yet."
			}>
			{/* ? BASE CATEGORIES */}
			<Group
				handleCheck={handleCheck}
				checkBoxes={pathwayTypes.sort((a, b) =>
					a.name == 'Other' ? 1
					: b.name == 'Other' ? -1
					: a.name.localeCompare(b.name)
				)}
			/>
		</FormSection>
	)
}

export const Group = ({
	checkBoxes,
	handleCheck,
}: {
	handleCheck: (id: number, status: boolean) => void
	checkBoxes: Categories[]
}) => {
	return (
		<CheckboxGroup
			className={cn('col-span-2 row-start-3! grid w-full grid-cols-2 justify-between pl-10')}>
			{checkBoxes
				.sort((a, b) => {
					const childCompare = a.children.length - b.children.length
					if (childCompare !== 0) return childCompare
					return a.name.localeCompare(b.name)
				})
				.map(child => (
					<CategoryCheckboxes
						onChange={e => {
							console.log(e)
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
