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

export type NavReducerAction<A extends 'TOGGLE' | 'SET'> =
	A extends 'TOGGLE' ?
		{
			type: A
			key: keyof NavReducerState
		}
	:	{
			type: A
			key: keyof NavReducerState
			payload: boolean
		}

type NavReducerState = {
	open: boolean
	pin: boolean
}

export type SolidIcon = IconKey | `${IconKey}-s`

export type tSidebarReceiverItem = Exclude<Props<'a'>, 'name'>
	& Exclude<tNavListItem, 'icon'> & {
		userRoles?: string[]
		icon: SolidIcon
	}
