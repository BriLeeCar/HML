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
