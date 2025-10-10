'use client'

import type { ChangeEvent } from 'react'
import { FormField, Input, Label } from '~/components'
import type { RouterOutput } from '~/server/api/zod'
import { api } from '~/trpc/react'
import type { DispatchAction } from '../lib'

export const AuthorField = ({
	author,
	dispatchDataAction,
}: {
	author: RouterOutput<'blogPost', 'getById'>['author']
	dispatchDataAction: DispatchAction<'author'>
}) => {
	const authorList = api.user.getAll.useQuery()

	const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedAuthor = authorList.data?.find(
			(user) => user.id === e.target.value
		)

		if (selectedAuthor) {
			dispatchDataAction({
				type: 'SET_FIELD',
				payload: [
					{
						fieldKey: 'author',
						fieldValue: {
							...selectedAuthor,
							firstName: selectedAuthor.firstName || '',
							lastName: selectedAuthor.lastName || '',
						},
					},
				],
			})
		}
	}

	return (
		<FormField asCol>
			<Label>Author</Label>
			<Input
				defaultValue={
					[author.firstName, author.lastName].join(' ')
					|| author.name
					|| ''
				}
				onChange={handleAuthorChange}
				disabled
			/>
		</FormField>
	)
}
