import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@admin/_components/table'
import { Button, Icon } from '~/components/index'
import { toShortDate } from '~/lib/date'
import { api } from '~/trpc/server'

const ActionLink = ({ id, slug }: { id: string; slug: string }) => {
	const actions: Array<{
		name: string
		href: string
		external?: boolean
		icon: IconKey
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
	return actions.map((action) => {
		return (
			<Button
				title={action.name + ' Post'}
				variant='ghost'
				className='text-brand hover:text-brand-bright px-2'
				key={action.name}
				href={action.href}
				target={action.external ? '_blank' : undefined}>
				<Icon
					IconName={action.icon}
					className='inline h-4 w-4'
				/>
			</Button>
		)
	})
}

const BlogPage = async () => {
	const blogPages = await api.blogPost.getAll()

	return (
		<div className='mx-auto mt-8 max-w-4xl'>
			<div className='flex items-center justify-between px-4'>
				<Button
					href='blog/add'
					variant='bright'
					title='Add New Post'
					className='mb-4'>
					<Icon
						IconName='PlusIcon'
						data-slot='icon'
						className='h-4 w-4'
					/>{' '}
					Add New Post
				</Button>
			</div>
			<Table className='mx-4'>
				<TableHead>
					<TableRow className='bg-zinc-200/50 text-xs uppercase *:font-semibold dark:bg-zinc-800'>
						<TableHeader></TableHeader>
						<TableHeader className='w-1/2'>post</TableHeader>
						<TableHeader className='w-full'>author</TableHeader>
						<TableHeader>created</TableHeader>
						<TableHeader>tags</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{blogPages.map((post) => (
						<TableRow
							key={post.id}
							className='*:align-top'>
							<TableCell>
								<ActionLink
									id={post.id.toString()}
									slug={post.slug}
								/>
							</TableCell>
							<TableCell>
								<div className='font-medium'>{post.name}</div>
								<div className='text-sm text-zinc-500 dark:text-zinc-400'>
									<small>/{post.slug}</small>
								</div>
							</TableCell>
							<TableCell>
								{post.author ?
									<div className='flex flex-col font-medium'>
										{post.author.firstName && post.author.lastName ?
											`${post.author.firstName} ${post.author.lastName}`
										:	post.author.name}
									</div>
								:	<span className='text-sm text-zinc-500 dark:text-zinc-400'>
										Unknown Author
									</span>
								}
							</TableCell>
							<TableCell>{toShortDate(post.createdAt)}</TableCell>
							<TableCell>
								<div className='flex flex-wrap gap-1'>
									{post.tags?.map(({ tag }, index) => (
										<span
											key={index}
											className='rounded-full bg-zinc-200 px-2 py-1 text-xs text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200'>
											{tag.name}
										</span>
									))}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default BlogPage
