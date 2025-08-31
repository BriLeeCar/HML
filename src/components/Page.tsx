'use client'

import { useState } from 'react'
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
	...props
}: Props<'h3'> & {
	title: string
	defaultOpen?: boolean
	wrapperProps?: Props<'article'>
}) => {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<article
			{...wrapperProps}
			className={cn('my-8', wrapperProps?.className)}>
			<h3
				{...props}
				className={cn(
					'click',
					'flex items-center gap-4 text-lg font-semibold tracking-tight text-pretty text-red-500 saturate-75',
					props.className
				)}
				onClick={() => setOpen(!open)}>
				<Icon
					IconName='ChevronRightIcon'
					className={cn(open && 'rotate-90')}
				/>{' '}
				{title}
			</h3>
			<div className='pl-6 *:mt-0'>{open && props.children}</div>
			{!open && (
				<div className='indent-4 text-lg text-gray-500 italic'>
					...
				</div>
			)}
		</article>
	)
}
