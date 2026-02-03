declare global {
	type AnySafe = any
	type AnyObject = Record<string, AnySafe>
	type Sub<T, Target extends keyof T, NewType> = Omit<T, Target> & {
		[key in Target]: NewType
	}

	type Slug<V> = {
		params: Promise<V>
	}

	type Valid<T> = Exclude<T, null | undefined>

	interface Window {
		db: typeof import('@/server/db/db').default
	}
}

export {}
