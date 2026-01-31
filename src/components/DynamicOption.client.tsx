'use client'

import { cn } from '@/lib/cn'
import type { PathwayCategory } from '@/payload-types'
import { CheckboxInput, useField } from '@payloadcms/ui'
import { type Dispatch, type FC, type SetStateAction, useState } from 'react'
import type { PathwayCategoryWithParent } from './DynamicOption.server'

export const SelectByFetchInner: FC<{
	path: string
	sorted: PathwayCategoryWithParent[]
}> = ({ path, sorted }) => {
	const { value, setValue } = useField({ path })

	const categories = (value ?? []) as PathwayCategory['id'][]

	const handleChecked = (
		id: PathwayCategory['id'],
		checked: boolean,
		action: Dispatch<SetStateAction<boolean>>
	) => {
		const newCategories =
			checked ? [...new Set([...categories, id])] : categories.filter(c => c != id)
		action(checked)
		setValue(newCategories)
	}

	return (
		<>
			{sorted?.map(top => (
				<PathwayCheckbox
					key={top.id}
					category={top}
					allCategories={categories}
					handleChecked={handleChecked}
				/>
			))}
		</>
	)
}

const PathwayCheckbox = ({
	category,
	allCategories,
	handleChecked,
}: {
	category: PathwayCategoryWithParent
	allCategories: PathwayCategory['id'][]
	handleChecked: (
		id: PathwayCategory['id'],
		checked: boolean,
		action: Dispatch<SetStateAction<boolean>>
	) => void
}) => {
	const hasChildren = category.children && category.children.length > 0
	const [checked, setChecked] = useState(allCategories.includes(category.id))

	return (
		<div className={cn('field-type checkbox', checked && hasChildren && 'col-span-2')}>
			<CheckboxInput
				onToggle={e => handleChecked(category.id, e.currentTarget.checked, setChecked)}
				label={category.title}
				checked={checked}
				className={checked ? '*:[label]:font-bold *:[label]:text-(--accent-color)' : ''}
			/>
			{hasChildren && allCategories.includes(category.id) && (
				<div className='grid grid-cols-2 pl-8 gap-y-2 mt-3'>
					{category.children?.map(child => (
						<PathwayCheckbox
							key={child.id}
							category={child}
							allCategories={allCategories}
							handleChecked={handleChecked}
						/>
					))}
				</div>
			)}
		</div>
	)
}
