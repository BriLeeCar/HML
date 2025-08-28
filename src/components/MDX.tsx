import { Children, ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { Heading } from './Heading'
import { Link } from './Link'

import { Large, List, P } from './Text'
import { Button } from './ui'

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
			size='lg'
			className='border-border/20 mt-8 border-b-1'
		/>
	),
	h4: ({ ...props }: Props<'h1'>) => (
		<Heading
			{...props}
			className='mt-6'
			level={4}
		/>
	),
	a: Link,
	p: P,
	P: P,
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
	Card: ({
		heading,
		subheading,
		footer,
		size = 'default',
		...props
	}: Props<'div'> & {
		heading?: React.ReactNode
		subheading?: React.ReactNode
		footer?: React.ReactNode
		size?: 'default' | 'sm' | 'lg'
	}) => {
		return (
			<article
				className={cn(
					size === 'sm' && 'max-w-sm',
					size === 'lg' && 'max-w-lg',
					size === 'default' && 'max-w-md'
				)}>
				<div
					{...props}
					data-slot='wrapper'
					className='bg-card text-card-foreground flex w-full max-w-sm flex-col gap-6 rounded-xl border py-6 shadow-sm'>
					{(heading || subheading) && (
						<div className='@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6'>
							{heading && (
								<span className='leading-none font-semibold'>
									{heading}
								</span>
							)}
							{subheading && (
								<span className='text-muted-foreground text-sm'>
									{subheading}
								</span>
							)}
						</div>
					)}
					<div
						className='px-4 *:[ul]:my-0 *:[ul]:ml-4'
						data-slot='content'>
						{props.children}
					</div>
					{footer && (
						<div className='flex flex-col items-center gap-2 px-6 [.border-t]:pt-6'>
							{footer}
						</div>
					)}
				</div>
			</article>
		)
	},
	CardGroup: ({ ...props }: Props) => {
		const columns = Children.toArray(props.children).length
		return (
			<section
				{...props}
				className={cn(
					'my-2 grid gap-4 **:[:is([data-slot="content"],[data-slot="wrapper"])]:h-full',
					`grid-cols-[${columns}]`
				)}
				style={{
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				}}
			/>
		)
	},
	ul: List,
	ol: ({ ...props }) => {
		return (
			<List
				type='numbered'
				{...props}
			/>
		)
	},
	li: ({ ...props }: Props<'li'>) => (
		<li
			{...props}
			className={cn(
				'list-label:list-none list-label:ml-0',
				// '[:is(li_li)]:text-foreground pl-0 not-[li_li]:first:has-[ul]:list-none',
				props.className
			)}
		/>
	),
	Large,
	table: ({ ...props }: Props<'table'>) => (
		<table
			className='bg-accent mx-auto table-auto border-collapse text-left'
			{...props}
		/>
	),
	th: ({ ...props }: Props<'th'>) => (
		<th
			className='border-muted-foreground border-b-[1.5px] px-4 py-1 text-left text-lg font-semibold italic'
			{...props}
		/>
	),
	td: ({ ...props }: Props<'td'>) => (
		<td
			className='border-muted-foreground/50 px-4 py-2 not-[tr:last-of-type_td]:border-b'
			{...props}
		/>
	),
	Button: ({ ...props }: Props<typeof Button> & { href: string }) => {
		return (
			<Button
				as='link'
				{...props}
				className={cn(props.className || '')}>
				{props.children}
			</Button>
		)
	},
	sup: ({ ...props }: Props<'sup'>) => (
		<sup
			{...props}
			className={cn(
				'text-accent-primary *:text-xs *:no-underline *:[a]:decoration-0',
				props.className
			)}
		/>
	),
	CTALink: ({ ...props }: Props<typeof Link>) => {
		return (
			<Link
				{...props}
				className={cn(
					'mx-auto my-2 block w-full text-center text-xl font-bold decoration-double',
					props.className
				)}>
				{props.children}
			</Link>
		)
	},
	CTA: ({
		heading,
		href,
		call,
		...props
	}: Props & {
		heading: ReactNode
		href: string
		call: ReactNode
	}) => {
		return (
			<div className='px-6 py-24 sm:py-32 lg:px-8'>
				<div className='mx-auto max-w-2xl'>
					<Heading className='text-foreground text-4xl font-semibold tracking-tight text-balance sm:text-5xl'>
						{heading}
					</Heading>
					<P className='mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300'>
						{props.children}
					</P>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						{href && (
							<Button href={href}>{call || 'Get started'}</Button>
						)}
					</div>
				</div>
			</div>
		)
	},
}
