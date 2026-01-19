export type SolidIcon = IconKey | `${IconKey}-s`

export type tNavListItem = {
	roles?: string[]
	section?: tNavListSection['key']
	name: string
	href: string
	icon: IconKey
	solid?: boolean
}

export type tNavListSection = {
	key: string
	name: string
}

export const navList: tNavListItem[] = [
	{ name: 'Dashboard', href: '/admin', icon: 'GlobeIcon', solid: true, roles: [] },
	{ name: 'Pathways', href: '/admin/pathways/add', icon: 'PlaneIcon', solid: true, roles: [] },
	{
		name: 'Profile',
		href: '/admin/settings/profile',
		icon: 'UserCircleIcon',
		solid: true,
		roles: [],
	},
	{
		name: 'Users',
		href: '/admin/users',
		icon: 'UserIdCardIcon',
		solid: true,
		roles: ['admin'],
		section: 'admin',
	},
]

export const navListSections: tNavListSection[] = [
	{
		key: 'admin',
		name: 'Admin',
	},
]
