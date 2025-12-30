export const navList = [
	{ name: 'Dashboard', href: '/admin', icon: 'GlobeIcon', solid: true },
	{ name: 'Pathways', href: '/admin/pathways/add', icon: 'PlaneIcon', solid: true },
	{ name: 'Profile', href: '/admin/settings/profile', icon: 'UserCircleIcon', solid: true },
	{
		name: 'Users',
		href: '/admin/users',
		icon: 'UserIdCardIcon',
		solid: true,
	},
] as {
	name: string
	href: string
	icon: IconKey
	solid?: boolean
}[]
