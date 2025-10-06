'use client'
import { Field } from '@/admin/_components/fieldset'
import { Input } from '@admin/_components/input'
import type { ChangeEvent } from 'react'
import type { z } from 'zod'
import { Label } from '~/components/index'
import { zBlogPostAddSchema, zBlogPostEditSchema } from '~/lib/zod'
import { api } from '~/trpc/react'
import { DispatchAction } from '../lib'

export const AuthorField = ({
	author,
	dispatchDataAction,
}: {
	author:
		| z.infer<typeof zBlogPostAddSchema>['author']
		| z.infer<typeof zBlogPostEditSchema>['author']
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
		<Field>
			<Label>Author</Label>
			<Input
				defaultValue={author.fullName || author.name || ''}
				onChange={handleAuthorChange}
				disabled
			/>
		</Field>
	)
}
