import { cn } from '~/lib/cn'
import { Button } from '.'
import { Section, SectionHeading } from './Structure/Section'

type CTAProps = Props<'div'> & {
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
}

export const CTA = ({ primaryAction, secondaryAction, subtitle, ...props }: CTAProps) => {
	return (
		<Section
			className={cn(
				'grid gap-y-2 md:grid-cols-[auto_minmax(0px,150px)]',
				!secondaryAction && 'grid-cols-[auto_minmax(0px,150px)]',
				props.className
			)}>
			<SectionHeading className='text-hml-red dark:text-hml-yellow col-start-1'>
				{props.children}
			</SectionHeading>
			<span
				className={cn(
					'text-muted-foreground col-start-1 flex w-full flex-col gap-y-2 text-base text-[.95rem] leading-[1.85] md:gap-y-6 md:pr-4 md:pl-2',
					!primaryAction && !secondaryAction && 'max-w-[calc(100%-150px)]'
				)}>
				{subtitle}
			</span>
			{(primaryAction || secondaryAction) && (
				<Actions
					primaryAction={primaryAction}
					secondaryAction={secondaryAction}
				/>
			)}
		</Section>
	)
}

const PrimaryAction = ({ primaryAction }: CTAProps) => {
	const { label, ...actions } = primaryAction!
	return (
		<Button
			{...actions}
			className='max-h-min'
			href={actions?.href || '#'}
			target={actions?.target || '_self'}
			variant='default'>
			{label}
		</Button>
	)
}

const SecondaryAction = ({ secondaryAction }: CTAProps) => (
	<a
		href={secondaryAction?.href}
		className='max-h-min text-xs/6 font-semibold whitespace-nowrap text-zinc-900 hover:opacity-80 dark:text-zinc-100'>
		{secondaryAction?.label}
		<span aria-hidden='true'>→</span>
	</a>
)

const Actions = ({ primaryAction, secondaryAction, className }: CTAProps) => (
	<div
		className={cn(
			'relative top-2 row-start-auto h-full content-start gap-y-6 self-center md:col-start-2 md:row-span-2 md:row-start-1',
			'flex w-full flex-wrap justify-around',
			className
		)}>
		{primaryAction && <PrimaryAction primaryAction={primaryAction} />}
		{secondaryAction && <SecondaryAction secondaryAction={secondaryAction} />}
	</div>
)
