'use client'
import { usePathname } from 'next/navigation'
import { type ReactNode, useCallback, useMemo, useState } from 'react'
import { CurrentPathContext } from './SidebarContext'
import type { NavReducerAction } from './types'

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
	const currentPath = usePathname()
	const [open, setOpen] = useState(true)
	const [pin, setPin] = useState(true)

	const sidebarContextAction = useCallback((action: NavReducerAction<'SET' | 'TOGGLE'>) => {
		if (action.type === 'TOGGLE') {
			if (action.key === 'open') {
				setOpen(prev => !prev)
			} else if (action.key === 'pin') {
				setPin(prev => !prev)
			}
		} else if (action.type === 'SET') {
			if (action.key === 'open') {
				setOpen(action.payload)
			} else if (action.key === 'pin') {
				setPin(action.payload)
			}
		}
	}, [])

	const sidebarContextValue = useMemo(
		() => ({
			open,
			pin,
			set: sidebarContextAction,
		}),
		[open, pin, sidebarContextAction]
	)

	return (
		<CurrentPathContext.Provider
			value={{
				currentPath,
				...sidebarContextValue,
			}}>
			{children}
		</CurrentPathContext.Provider>
	)
}
