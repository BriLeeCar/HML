import { FormGroupError } from '@/admin/_components'
import { FormSection } from '@/admin/_components/_form/clientFieldset'
import { CheckboxGroup } from '@/admin/_components/catalyst/'
import { cn } from '~/lib/cn'
import type { PathwayTypeRecursive } from '~/server/api/routers'

import type { ElPrismaProps } from '@/admin/pathways/_lib/types'
import { CategoryCheckboxes } from './CB'

export type Categories = PathwayTypeRecursive & { parentId?: string | null }

export const CategorySection = ({
	...props
}: ElPrismaProps & {
	pathwayTypes: Categories[]
}) => {
	const handleCheck = (id: number, status: boolean) => {
		const newData = { ...props.data }
		if (props.data.query.categories == undefined) {
			newData.query.categories = []
		}
		const newCategories = [...props.data.query.categories, id].filter(c => {
			if (status) return true
			return c !== id
		})

		newData.query.categories = newCategories
		props.handlePrisma(newData)
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
				{props.data.errors.categories.length > 0 && (
					<FormGroupError
						className='text-center'
						message={props.data.errors.categories}
					/>
				)}
				{/* ? BASE CATEGORIES */}
				<Group
					data={props.data}
					readOnly={props.readOnly}
					showDefaults={props.showDefaults}
					handleCheck={handleCheck}
					checkBoxes={props.pathwayTypes.sort((a, b) =>
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
	readOnly,
	showDefaults,
	data,
	...props
}: Props & {
	handleCheck: (id: number, status: boolean) => void
	checkBoxes: Categories[]
	readOnly?: boolean
	showDefaults?: boolean
	data: Query
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
						defaultChecked={showDefaults ? data.query.categories?.includes(child.id) : undefined}
						readOnly={readOnly}
						onChange={e => {
							handleCheck(child.id, e)
						}}
						handleCheck={handleCheck}
						key={child.id}
						cb={child}
						data={data}
					/>
				))}
		</CheckboxGroup>
	)
}
