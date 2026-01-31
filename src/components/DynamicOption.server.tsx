import type { PathwayCategory } from '@/payload-types'
import { type Payload } from 'payload'
import { type FC } from 'react'
import { SelectByFetchInner } from './DynamicOption.client'

export type PathwayCategoryWithParent = Omit<PathwayCategory, 'parent'> & {
	parent: PathwayCategoryWithParent | null
	children?: PathwayCategoryWithParent[]
}

const processPathwayCategories = (
	categories: PathwayCategoryWithParent[]
): PathwayCategoryWithParent[] => {
	const findChildren = (parentId: number): PathwayCategoryWithParent[] => {
		return categories
			.filter(c => c.parent?.id == parentId)
			.map(c => ({ ...c, children: findChildren(c.id) }))
	}
	const tree: PathwayCategoryWithParent[] = categories
		.sort((a, b) => {
			if (a.parent != null || b.parent == null) {
				if (a.parent != null && a.parent.id == b.id) {
					return 1
				} else if (b.parent != null && b.parent.id == a.id) {
					return -1
				}
			}
			return (
				a.parent == null ? -1
				: b.parent == null ? 1
				: a.parent.id - b.parent.id
			)
		})
		.reduce((final, current) => {
			if (current.parent == null) {
				final.push({
					...current,
					children: findChildren(current.id),
				})
			}
			return final
		}, [] as PathwayCategoryWithParent[])
	return tree
}

const PathwaysSelectCurrency: FC<{
	path: string
	label: string
	payload: Payload
}> = async ({ label, payload, path }) => {
	const opts = await payload.find({
		collection: 'pathway-categories',
		pagination: false,
	})

	const sorted = processPathwayCategories(opts.docs as PathwayCategoryWithParent[])

	return (
		<div>
			<label className='field-label'>{label}</label>
			<SelectByFetchInner
				path={path}
				sorted={sorted}
			/>
		</div>
	)
}

export default PathwaysSelectCurrency
