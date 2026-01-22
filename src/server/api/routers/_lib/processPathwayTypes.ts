import type { PathwayTypes } from '~/server/prisma/generated/browser'

type PathwayTypeOmitted = Omit<PathwayTypes, 'parentId'>
export type PathwayTypeRecursive = PathwayTypeOmitted & { children: PathwayTypeRecursive[] }

export const processPathwayTypes = (pathwayTypesQuery: PathwayTypes[]) => {
	const getChildren = (parentId: number): PathwayTypeRecursive[] => {
		return pathwayTypesQuery
			.filter(pt => pt.parentId === parentId)
			.map(pt => ({
				...pt,
				children: getChildren(pt.id),
			}))
	}

	const pathwayTypes = pathwayTypesQuery
		.sort((a, b) => {
			if (a.parentId || b.parentId) {
				if (a.parentId && a.parentId == b.id) {
					return 1
				} else if (b.parentId && b.parentId == a.id) {
					return -1
				}
			}
			return (
				a.parentId == null ? -1
				: b.parentId == null ? 1
				: a.parentId - b.parentId
			)
		})
		.reduce((acc, curr) => {
			if (!curr.parentId) {
				acc.push({
					...curr,
					children: getChildren(curr.id),
				})
			}
			return acc
		}, [] as PathwayTypeRecursive[])

	return pathwayTypes
}
