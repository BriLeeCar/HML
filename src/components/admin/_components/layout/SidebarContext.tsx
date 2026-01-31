import { createContext } from 'react'
import type { NavReducerAction } from './types'

export const CurrentPathContext = createContext<{
	currentPath: string
	open: boolean
	pin: boolean
	set: (action: NavReducerAction<'SET' | 'TOGGLE'>) => void
	userRole?: number[]
} | null>(null)
