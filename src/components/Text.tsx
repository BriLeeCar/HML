import { cn } from '~/cn'

export const P = ({ ...props }: Props<'p'>) => {
	return (
		<p
			{...props}
			className={cn(
				'indent-6 leading-7 [&:not(:first-child,:is(h1,h2,h3,h4,h5,h6)+p)]:mt-6',
				props.className
			)}
		/>
	)
}

export const Blockquote = ({ ...props }: Props<'blockquote'>) => {
	return (
		<blockquote
			{...props}
			className={cn('mt-6 border-l-2 pl-6 italic', props.className)}
		/>
	)
}

export const List = ({
	type,
	...props
}: Props<'ul'> & { type: 'numbered' | '' }) => {
	const Tag = type === 'numbered' ? 'ol' : 'ul'
	return (
		<Tag
			{...props}
			className={cn(
				type === 'numbered' ? 'list-decimal' : 'list-disc',
				'my-6 ml-6 [&>li]:mt-2',
				props.className
			)}
		/>
	)
}
