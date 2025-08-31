import { cn } from '~/lib/cn'

export const P = ({ ...props }: Props<'p'>) => {
	return (
		<p
			{...props}
			className={cn(
				'leading-8 text-pretty [&:not(:first-child,:is(h1,h2,h3,h4,h5,h6)+p)]:mt-6',
				props.className
			)}
		/>
	)
}

export const List = ({
	type,
	...props
}: Props<'ul'> & { type?: 'numbered' | '' }) => {
	const Tag = type === 'numbered' ? 'ol' : 'ul'
	return (
		<Tag
			{...props}
			className={cn(
				'leading-8 text-pretty',
				type === 'numbered' ? 'list-decimal' : 'list-disc',
				'my-6 ml-6 marker:font-bold has-[>li.task-list-item]:list-none *:[li]:pl-2 [li>ol]:my-0 [li>ul]:my-0 [&>li]:mt-2',
				'list-label:list-none list-label:ml-0',
				'[:is(h1,h2,h3,h4,h5,h6)+*:is(ul,ol)]:mt-0',
				props.className
			)}
		/>
	)
}

export const Large = ({ ...props }: Props<'span'>) => {
	return (
		<span
			{...props}
			className={cn(
				'mx-auto block max-w-lg py-2 text-center text-lg',
				props.className
			)}
		/>
	)
}
