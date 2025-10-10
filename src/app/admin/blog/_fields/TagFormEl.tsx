'use client'

import { type Dispatch, useReducer, useRef } from 'react'
import { Fieldset, Input } from '~/components'
import { cn } from '~/lib/cn'
import type { zTag } from '~/zod'

type Tag = NonNullable<zTag>

type TagsObj = {
	allTags: Tag[]
	current: Tag[]
	search: string
	filtered: Tag[]
}

type ReducerActionTypes =
	| 'SET_SEARCH'
	| 'ADD_TAG'
	| 'REMOVE_TAG'
	| 'SET_FILTERED'
	| 'CLEAR_SEARCH'

type ReducerAction<T = ReducerActionTypes> = {
	type: T
	payload: T extends 'SET_SEARCH' ? string
	: T extends 'ADD_TAG' ? Tag
	: T extends 'REMOVE_TAG' ? Tag
	: T extends 'SET_FILTERED' ? Tag[]
	: T extends 'CLEAR_SEARCH' ? null
	: never
}

const tagReducer = (
	state: TagsObj,
	action: ReducerAction<ReducerActionTypes>,
	inputRef: React.RefObject<HTMLInputElement | null>
) => {
	const newState = { ...state }

	const filterTags = (search: string) => {
		return removeCurrentTags(
			newState.allTags.filter((tag) =>
				tag.name.toLowerCase().includes(search.toLowerCase())
			)
		)
	}

	const removeCurrentTags = (tags: Tag[]) => {
		return tags.filter((tag) => !newState.current.includes(tag))
	}

	switch (action.type) {
		case 'SET_SEARCH':
			newState.search = (
				action as ReducerAction<'SET_SEARCH'>
			).payload
			newState.filtered = filterTags(newState.search)
			break
		case 'ADD_TAG':
			const tagToAdd = (action as ReducerAction<'ADD_TAG'>).payload
			if (!newState.current.includes(tagToAdd)) {
				newState.current.push(tagToAdd)
			}
			newState.search = ''
			newState.filtered = filterTags(newState.search)
			inputRef.current && (inputRef.current.value = '')
			break
		case 'REMOVE_TAG':
			const tagToRemove = (action as ReducerAction<'REMOVE_TAG'>)
				.payload
			newState.current = newState.current.filter(
				(tag) => tag.id !== tagToRemove.id
			)
			newState.filtered = filterTags(newState.search)
			break
		case 'SET_FILTERED':
			newState.filtered = (
				action as ReducerAction<'SET_FILTERED'>
			).payload
			break
		case 'CLEAR_SEARCH':
			newState.search = ''
			newState.filtered = []
			inputRef.current && (inputRef.current.value = '')
			break
		default:
			throw new Error('Unknown action type')
	}

	return newState
}

export const TagFormEl = ({ ...data }) => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	const [tags, dispatch] = useReducer(
		(state, action) => tagReducer(state, action, inputRef),
		{
			allTags: data.allTags as Tag[],
			current: data.tags ?? ([] as Tag[]),
			search: '',
			filtered: [] as Tag[],
		}
	)

	return (
		<Fieldset legend='Tags'>
			{/* Tag Search Input */}
			<Input
				type='text'
				onChange={(e) => {
					dispatch({ type: 'SET_SEARCH', payload: e.target.value })
				}}
				className='mt-4'
				ref={inputRef}
				defaultValue={tags.search}
				onBlur={(e) =>
					e.currentTarget.value === ''
					&& dispatch({ type: 'CLEAR_SEARCH', payload: null })
				}
				placeholder='Search tags and press Enter'
			/>
			{tags.filtered.length > 0 && tags.search.length > 0 && (
				<div className='mt-1 max-h-40 overflow-y-auto rounded border border-gray-300'>
					{tags.filtered.map((tag) => (
						<div
							key={tag.id}
							className='cursor-pointer px-2 py-1 hover:bg-gray-200'
							onMouseDown={(e) => {
								dispatch({ type: 'ADD_TAG', payload: tag })
								e.preventDefault()
							}}>
							{tag.name}
						</div>
					))}
				</div>
			)}

			<CurrentTags
				tags={tags}
				dispatch={dispatch}
			/>
		</Fieldset>
	)
}

const CurrentTags = ({
	tags,
	dispatch,
}: {
	tags: TagsObj
	dispatch: Dispatch<ReducerAction>
}) => (
	<div
		className={cn(
			tags.current.length > 0 && 'my-4 flex lg:block',
			'items-baseline gap-4'
		)}>
		<div
			className='flex flex-wrap gap-1'
			id='selected-tags'>
			{tags.current.map((tag) => (
				<span
					key={tag.id}
					id={tag.id.toString()}
					className={cn(
						'inline-block rounded-[.55rem] border-1 border-current/10 px-3 py-1 font-mono text-[50%] font-thin tracking-widest uppercase',
						tag.color === 'blue' && 'bg-blue-100 text-blue-800',
						tag.color === 'red' && 'bg-red-100 text-red-800',
						tag.color === 'green' && 'bg-green-100 text-green-800',
						tag.color === 'yellow' && 'bg-yellow-100 text-yellow-800',
						tag.color === 'purple' && 'bg-purple-100 text-purple-800',
						tag.color === 'grey' && 'bg-gray-200 text-gray-600',
						'cursor-pointer hover:opacity-75',
						'hover:[*:after]:ml-1 hover:[*:after]:text-base hover:[*:after]:[content:"x"]'
					)}
					onClick={() =>
						dispatch({ type: 'REMOVE_TAG', payload: tag })
					}>
					{tag.name}
				</span>
			))}
		</div>
	</div>
)
