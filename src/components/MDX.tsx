import { cn } from '~/cn'
import { Heading } from './Heading'
import { Link } from './Link'
import { P } from './Text'

export const mdxComponents = {
	h1: ({ ...props }: Props<'h1'>) => (
		<Heading
			{...props}
			level={1}
			size='title'
		/>
	),
	h2: ({ ...props }: Props<'h1'>) => (
		<Heading
			{...props}
			level={2}
			size='lg'
		/>
	),
	h3: ({ ...props }: Props<'h1'>) => (
		<Heading
			{...props}
			level={3}
			size='md'
		/>
	),
	h4: ({ ...props }: Props<'h1'>) => (
		<Heading
			{...props}
			level={4}
		/>
	),
	a: Link,
	p: P,
	blockquote: ({ ...props }: Props<'blockquote'>) => (
		<blockquote
			className='border-accent-500 mx-8 my-4 border-l-4 pl-4 text-gray-500 italic'
			{...props}
		/>
	),
	U: ({ ...props }: Props<'u'>) => (
		<span
			{...props}
			className={cn(
				'underline decoration-current/30 underline-offset-2',
				props.className
			)}
		/>
	),
}
