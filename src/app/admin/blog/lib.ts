import type { ActionDispatch } from 'react'
import type { RouterOutputs } from '~/trpc/react'

type FormType = 'edit' | 'add'

type Router<T extends FormType> = NonNullable<
	RouterOutputs['blogPost']['getById']
> & {
	type: T
}

export type RouterForm<
	T extends FormType,
	O extends HTMLInputElement['value'],
> = {
	[K in keyof Router<T>]: {
		input: O
		label: string
		state: Router<T>[K] | null
		transform: (val: O) => Router<T>[K]
	}
}

export type Key<T extends FormType> = keyof Router<T>

export type BlogPst = Router<FormType>

export type DispatchAction<T extends Key<FormType>> = ActionDispatch<
	[action: ReducerSetField<T>]
>
export type ReducerSetField<K extends Key<FormType>> = {
	type: 'SET_FIELD'
	payload: Array<{
		fieldKey: K
		fieldValue: Router<FormType>[K] | null
	}>
}

export const dataReducer = <T extends Key<FormType>>(
	state: BlogPst,
	action: ReducerSetField<T>
) => {
	const newState = { ...state }

	switch (action.type) {
		case 'SET_FIELD':
			action.payload.forEach(({ fieldKey: key, fieldValue: val }) => {
				Object.assign(newState, { [key]: val })
			})
	}

	return newState
}
