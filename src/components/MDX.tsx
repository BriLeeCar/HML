import { Children } from 'react'
import { cn } from '~/lib/cn'
import {
	Blockquote,
	Bold,
	Button,
	CTA,
	Heading,
	InlineLink,
	Large,
	Li,
	OL,
	P,
	Page,
	PageHeading,
	Section,
	SectionHeading,
	SubSection,
	Sup,
	U,
	UL,
} from '.'

export function mdxComponents() {
	return {
		h1: ({ children, ...props }: Props<'h1'>) => (
			<PageHeading {...props}>{children}</PageHeading>
		),
		h2: ({ ...props }: Props<'h1'>) => <SectionHeading {...props} />,
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
		p: P,
		P,
		blockquote: Blockquote,
		U,
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
		ul: UL,
		ol: OL,
		li: Li,
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
		Button: ({
			...props
		}: Props<typeof Button> & { href: string }) => {
			return (
				<Button
					as='link'
					prefetch={false}
					{...props}
					className={cn(props.className || '')}>
					{props.children}
				</Button>
			)
		},
		sup: Sup,
		Section: Section,
		SectionHeading,
		SubSection,
		Page,
		PageHeading,
		InlineLink,
		a: InlineLink,
		CTA,
		strong: Bold,
	}
}
