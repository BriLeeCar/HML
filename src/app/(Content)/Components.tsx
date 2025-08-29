'use client'

import { Main } from '@/(Content)/_Layout/Wrapper'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'

export const Subtitle = ({ ...props }: Props<'p'>) => (
	<p
		className={cn(
			'mt-6 text-xl/8 text-balance text-gray-700 dark:text-gray-300',
			props.className
		)}>
		{props.children}
	</p>
)

export const Eyebrow = ({ ...props }: Props<'p'>) => {
	return (
		<p
			className={cn(
				'text-base/7 font-semibold text-red-600 dark:text-red-400',
				props.className
			)}>
			{props.children}
		</p>
	)
}

export const PageTitle = ({ ...props }) => (
	<h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 capitalize sm:text-5xl dark:text-white'>
		{props.children}
	</h1>
)

export const PageHeading = ({
	eyebrow,
	subtitle,
	children,
	...props
}: {
	eyebrow?: string | ReactNode
	subtitle?: ReactNode
	children: ReactNode
} & Props<'div'>) => (
	<div className='max-w-4xl'>
		{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
		<PageTitle {...props}>{children}</PageTitle>
		{subtitle && <Subtitle>{subtitle}</Subtitle>}
	</div>
)

export const SectionHeading = ({
	eyebrow,
	subtitle,
	...props
}: Props<'h2'> & {
	eyebrow?: ReactNode
	subtitle?: ReactNode
}) => {
	const Inner = () => (
		<h2
			{...props}
			className={cn(
				'text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white',
				props.className
			)}>
			{props.children}
		</h2>
	)

	if (eyebrow || subtitle) {
		return (
			<hgroup className='mb-0'>
				{eyebrow && (
					<Eyebrow className='text-sm/8 saturate-85'>
						{eyebrow}
					</Eyebrow>
				)}
				<Inner />
				{subtitle && (
					<Subtitle className='text-lg md:mt-4'>{subtitle}</Subtitle>
				)}
			</hgroup>
		)
	}
	return <Inner />
}

export const Section = ({ ...props }: Props<'section'>) => (
	<section
		{...props}
		className={cn('mt-8 flex flex-col md:mt-16', props.className)}>
		{props.children}
	</section>
)

export const Page = ({ ...props }) => (
	<Main>
		<section className='mx-auto w-full max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
			{props.children}
		</section>
	</Main>
)

export const CTA = ({
	primaryAction,
	secondaryAction,
	subtitle,
	...props
}: Props & {
	primaryAction?: {
		href: string
		label: string
	}
	secondaryAction?: {
		href: string
		label: string
	}
	subtitle?: string
}) => {
	const Head = () => (
		<h2 className='max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white'>
			{props.children}
		</h2>
	)

	const PrimaryAction = () => (
		<a
			href={primaryAction?.href}
			className={cn(
				'rounded-md bg-red-800 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap text-white shadow-xs hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400 dark:focus-visible:outline-zinc-500'
			)}>
			{primaryAction?.label}
		</a>
	)

	const SecondaryAction = () => (
		<a
			href={secondaryAction?.href}
			className='text-xs/6 font-semibold text-zinc-900 hover:opacity-80 dark:text-zinc-100'>
			{secondaryAction?.label}
			<span aria-hidden='true'>→</span>
		</a>
	)

	const Actions = () => (
		<div
			className={cn(
				'col-span-full row-start-3 mt-10 flex w-full items-center gap-x-6 pt-10 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:w-auto sm:pt-0 md:mt-0 md:shrink-0',
				subtitle && 'mt-0 items-end justify-self-end'
			)}>
			{primaryAction && <PrimaryAction />}
			{secondaryAction && <SecondaryAction />}
		</div>
	)

	if (subtitle && (primaryAction || secondaryAction)) {
		return (
			<div className='relative mx-auto grid w-full grid-cols-1 py-16 sm:grid-cols-[auto_1fr] sm:py-8'>
				<Head />
				<Actions />
				<Subtitle className='col-span-2'>{subtitle}</Subtitle>
			</div>
		)
	}

	return (
		<div
			className={cn(
				'mx-auto flex flex-col items-center justify-between py-16 sm:py-8',
				subtitle ? 'flex-col items-start' : 'md:flex-row'
			)}>
			{subtitle ?
				<hgroup className='mb-6 max-w-2xl'>
					<Head />
					<Subtitle>{subtitle}</Subtitle>
				</hgroup>
			:	<Head />}
			{(primaryAction || secondaryAction) && <Actions />}
		</div>
	)
}

export const Divider = ({ children }: { children?: ReactNode }) => {
	return (
		<div className='my-10 flex items-center'>
			<div
				aria-hidden='true'
				className='w-full border-t border-gray-300 dark:border-white/15'
			/>
			<div className='relative flex justify-center'>
				{children && (
					<span className='bg-white px-2 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400'>
						{children}
					</span>
				)}
			</div>
			<div
				aria-hidden='true'
				className='w-full border-t border-gray-300 dark:border-white/15'
			/>
		</div>
	)
}

export const SubSection = ({
	defaultOpen = true,
	title,
	...props
}: Props<'h3'> & { title: string; defaultOpen?: boolean }) => {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<article className='my-8'>
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

export const InlineLink = ({ ...props }: Props<typeof Link>) => (
	<Link
		{...props}
		className='font-bold underline underline-offset-2'
	/>
)
