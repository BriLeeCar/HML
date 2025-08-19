declare global {
	type AnySafe = any
	type AnyObject = Record<string, AnySafe>
	type Sub<T, Target extends keyof T, NewType> = Omit<T, Target> & {
		[key in Target]: NewType
	}

	type Slug<V> = {
		params: Promise<V>
	}
}

export {}
