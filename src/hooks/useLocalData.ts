'use client'

import { useSyncExternalStore } from 'react'

const subscribe = (cb: () => void) => {
	const interval = setInterval(cb, 1000)
	return () => clearInterval(interval)
}

const getSnapshot = (key: string) => () => window.localStorage.getItem(key)

const getServerSnapshot = () => {
	return null
}

export const useLocalData = <T>(key: string) => {
	const store = useSyncExternalStore(subscribe, getSnapshot(key), getServerSnapshot)

	return store ? (JSON.parse(store) as T) : null
}
