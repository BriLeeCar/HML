import type { ActionDispatch } from 'react'
import type { z } from 'zod'
import type {
	zBlogPostAddSchema,
	zBlogPostEditSchema,
} from '~/lib/zod'

export type BlogData =
	| z.infer<typeof zBlogPostEditSchema>
	| z.infer<typeof zBlogPostAddSchema>

export type DispatchAction<T> = ActionDispatch<
	[action: ReducerSetField<T>]
>
export type ReducerSetField<T> = {
	type: 'SET_FIELD'
	payload: Array<{
		fieldKey: T extends keyof BlogData ? T : never
		fieldValue: BlogData[T extends keyof BlogData ? T : never]
	}>
}

export const dataReducer = <T>(
	state: BlogData,
	action: ReducerSetField<T>
) => {
	const newState = { ...state }

	switch (action.type) {
		case 'SET_FIELD':
			action.payload.forEach(({ fieldKey: key, fieldValue: val }) => {
				newState[key] = val
			})
	}

	return newState
}
