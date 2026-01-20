'use client'

import { createContext } from 'react'

export const UserRoleContext = createContext<{
	roles: string[]
}>({
	roles: [],
})
