import type { SolidIcon, tNavListItem } from '@/admin/_lib/navLinks'

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

export type tSidebarReceiverItem = Exclude<Props<'a'>, 'name'>
	& Exclude<tNavListItem, 'icon'> & {
		userRoles?: string[]
		icon: SolidIcon
	}
