'use client'

import { useCallback, useMemo, useState } from 'react'
import { CookieContext } from './CookieContext'

export const CookieContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [allow, setAllow] = useState<boolean | null>(null)
	const [explorerFilters, setExplorerFilters] = useState<string[]>([])
	const cookieCB = useCallback((allow: boolean) => {
		setAllow(allow)
	}, [])

	const cookieContextValue = useMemo(
		() => ({
			allow,
			cookieCB,
			explorerFilters,
			setExplorerFilters,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[allow, explorerFilters]
	)

	return <CookieContext.Provider value={cookieContextValue}>{children}</CookieContext.Provider>
}
