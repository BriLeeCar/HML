'use client'

import { Button, Icon } from '~/components'
import { useToast } from '~/components/Admin/Toast'
import { api } from '~/trpc/react'

export const ActionLink = ({
	id,
	slug,
}: {
	id: string
	slug: string
}) => {
	const deletePost = api.blogPost.delete.useMutation({
		onSuccess: () => {
			toast.fireToast({
				status: 'success',
				title: 'Post Deleted',
				body: 'The post has been successfully deleted.',
			})
		},
	})

	const toast = useToast()

	const actions: Array<{
		name: string
		href: string
		external?: boolean
		icon: IconKey
		onClick?: () => void
	}> = [
		{
			name: 'Edit',
			href: `/admin/blog/edit?id=${id}`,
			icon: 'EditIcon',
		},
		{ name: 'Delete', href: '#', icon: 'TrashXIcon' },
		{
			name: 'View',
			href: `/blog/${slug}`,
			external: true,
			icon: 'EyeIcon',
		},
	]

	return (
		<>
			{actions.map((action) => {
				return (
					<Button
						title={action.name + ' Post'}
						variant='ghost'
						className='text-brand hover:text-brand-bright px-2'
						key={action.name}
						href={action.href}
						target={action.external ? '_blank' : undefined}
						onClick={() => {
							if (action.name == 'Delete') {
								if (
									confirm(
										'Are you sure you want to delete this post?'
									)
								) {
									deletePost.mutate(Number(id))
									location.reload()
								}
							}
						}}>
						<Icon
							IconName={action.icon}
							className='inline h-4 w-4'
						/>
					</Button>
				)
			})}
			<toast.El />
		</>
	)
}
