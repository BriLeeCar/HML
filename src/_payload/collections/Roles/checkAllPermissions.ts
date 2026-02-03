import type { Role } from '@/payload-types'

export const checkAllPermissions = (permissions: Role['permission']): boolean => {
	const permissionCategories = permissions as Valid<Role['permission']>

	return (Object.keys(permissionCategories) as Valid<keyof typeof permissionCategories>[]).every(
		categoryKey => {
			const categoryPermissions = permissionCategories[categoryKey] as Valid<
				(typeof permissionCategories)[typeof categoryKey]
			>

			return (Object.keys(categoryPermissions) as Valid<keyof typeof categoryPermissions>[]).every(
				permissionKey => {
					return categoryPermissions[permissionKey] == true
				}
			)
		}
	)
}
