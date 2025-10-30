import { ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { Button, Subtitle } from '.'

export const CTA = ({
	primaryAction,
	secondaryAction,
	subtitle,
	...props
}: Props & {
	primaryAction?: {
		href: string
		label: string
		target?: string
	} & Props<typeof Button>
	secondaryAction?: {
		href: string
		label: string
	}
	subtitle?: ReactNode
}) => {
	const Head = () => (
		<h2 className='max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white'>
			{props.children}
		</h2>
	)

	const PrimaryAction = () => {
		const { label, ...actions } = primaryAction!
		return (
			<Button
				{...actions}
				href={actions?.href || '#'}
				target={actions?.target || '_self'}
				variant='default'>
				{label}
			</Button>
		)
	}

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
				subtitle ? 'flex-col items-start' : 'md:flex-row lg:mx-8',
				props.className
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
