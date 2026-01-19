import { createContext } from 'react'

export const CookieContext = createContext<{
	allow: boolean | null
	cookieCB: (allow: boolean) => void
	explorerFilters: string[]
	setExplorerFilters: (filters: string[]) => void
}>(null!)
