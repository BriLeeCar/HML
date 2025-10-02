'use client'

import { ReactNode, useState } from 'react'
import { cn } from '~/lib/cn'
import { Icon, Main } from '.'

export const Page = ({ ...props }) => (
	<Main>
		<section className='mx-auto w-full max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
			{props.children}
		</section>
	</Main>
)

export const Section = ({ ...props }: Props<'section'>) => (
	<section
		{...props}
		className={cn('mt-8 flex flex-col md:mt-16', props.className)}>
		{props.children}
	</section>
)

export const SubSection = ({
	defaultOpen = true,
	title,
	wrapperProps,
	type = 'default',
	...props
}: Omit<Props<'button'>, 'type' | 'title'> & {
	title: ReactNode
	defaultOpen?: boolean
	wrapperProps?: Props<'article'>
	type?: 'default' | 'grey'
}) => {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<article
			{...wrapperProps}
			className={cn(open ? 'my-8' : 'my-6', wrapperProps?.className)}>
			<button
				role='heading'
				{...props}
				className={cn(
					'click',
					'flex w-full items-center gap-4',
					type == 'default'
						&& 'text-lg font-semibold tracking-tight text-pretty text-red-500 saturate-75',
					type == 'grey'
						&& 'dark:text-accent-foreground text-muted-foreground border-border/20 border-b-1 font-sans text-xl font-bold tracking-tighter brightness-75',
					open && 'mb-4',
					props.className
				)}
				onClick={() => setOpen(!open)}>
				<Icon
					IconName='ChevronRightIcon'
					className={cn(open && 'rotate-90')}
				/>{' '}
				{title}
			</button>
			<div className='pl-6'>{open && props.children}</div>
			{!open && type != 'grey' && (
				<div className='indent-4 text-lg text-gray-500 italic'>
					...
				</div>
			)}
		</article>
	)
}
