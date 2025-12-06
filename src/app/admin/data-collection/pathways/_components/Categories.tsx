import { FormSection, FormSubSection } from '@/admin/_components'
import {
	Checkbox,
	CheckboxField,
	CheckboxGroup,
	Description,
	Label,
} from '@/admin/_components/catalyst/'
import { useState } from 'react'
import { cn } from '~/lib/cn'
import type { PathwayTypeRecursive } from '~/server/api/routers'
import { type ElPrismaProps } from '..'

type Categories = PathwayTypeRecursive & { parentId?: string | null }
// type CategoryKeys = Categories['name']

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
			<FormSubSection
				className='*:grid-cols-1 *:pl-0'
				legend={'Base Categories'}
				description={'Select the base categories that best describe this pathway.'}>
				<Group
					handleCheck={handleCheck}
					checkBoxes={pathwayTypes.sort((a, b) =>
						a.name == 'Other' ? 1
						: b.name == 'Other' ? -1
						: a.name.localeCompare(b.name)
					)}
				/>
			</FormSubSection>
		</FormSection>
	)
}

const Group = ({
	checkBoxes,
	handleCheck,
}: {
	handleCheck: (id: number, status: boolean) => void
	checkBoxes: Categories[]
}) => {
	return (
		<CheckboxGroup
			className={cn('col-span-2 row-start-3! grid w-full grid-cols-3 justify-between pt-3 pl-10')}>
			{checkBoxes
				.sort((a, b) => {
					const childCompare = a.children.length - b.children.length
					if (childCompare !== 0) return childCompare
					return a.name.localeCompare(b.name)
				})
				.map(child => (
					<CB
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

const CB = ({
	cb,
	handleCheck,
	...props
}: Props<typeof Checkbox> & {
	handleCheck: (id: number, status: boolean) => void
	cb: Categories
}) => {
	const [checked, setChecked] = useState(false)
	const handle = (status: boolean) => {
		setChecked(status)
		handleCheck(cb.id, status)
	}

	return (
		<CheckboxField className='gap-y-0 has-data-checked:has-[div]:col-span-full'>
			<Checkbox
				{...props}
				onChange={e => {
					console.log(e)
					handle(e)
				}}
				color={'brand'}
				name={cb.name}
			/>
			<Label>{cb.name}</Label>
			<Description className='text-sm'>{cb.description}</Description>
			{checked && cb.children.length > 0 && (
				<Group
					handleCheck={handleCheck}
					checkBoxes={cb.children}
				/>
			)}
		</CheckboxField>
	)
}
