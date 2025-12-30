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

export type NavReducerState = {
	open: boolean
	pin: boolean
}
