import { cn } from '~/lib/cn'

const Main = ({ full, children, ...props }: Props & { full?: boolean }) => (
	<main
		{...props}
		className={cn(full && '', 'mx-auto h-full', props.className)}>
		{children}
	</main>
)

export const Page = ({ ...props }: Props) => (
	<Main
		{...props}
		className={cn('grid grid-cols-1 gap-y-12 px-4', props.className)}
	/>
)

export const Section = ({
	gap = 'lg',
	...props
}: Props<'section'> & { gap?: 'sm' | 'md' | 'lg' }) => (
	<section
		{...props}
		className={cn(
			'grid',
			gap == 'lg' && 'gap-y-8',
			gap == 'md' && 'gap-y-6',
			gap == 'sm' && 'gap-y-4',
			props.className
		)}>
		{props.children}
	</section>
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
	<header
		className='title-page max-h-min'
		aria-label={children?.toString()}>
		{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
		<PageTitle {...props}>{children}</PageTitle>
		{subtitle && <Subtitle>{subtitle}</Subtitle>}
	</header>
)

const PageTitle = ({ ...props }) => <h1 className={props.className}>{props.children}</h1>

const Subtitle = ({ ...props }: Props<'p'>) => (
	<p className={cn('subtitle', props.className)}>{props.children}</p>
)

const Eyebrow = ({ ...props }: Props<'p'>) => {
	return <span className={cn('eyebrow', props.className)}>{props.children}</span>
}

export const SectionHeading = ({
	eyebrow,
	subtitle,
	...props
}: Props<'h2'> & {
	eyebrow?: ReactNode
	subtitle?: ReactNode
}) => {
	if (eyebrow || subtitle) {
		return (
			<header
				className='title-section'
				aria-label={props.children?.toString()}>
				{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
				<SectionHeadingInner {...props} />
				{subtitle && <Subtitle>{subtitle}</Subtitle>}
			</header>
		)
	}
	return <SectionHeadingInner {...props} />
}

const SectionHeadingInner = ({ ...props }: Props<'h2'>) => (
	<h2
		{...props}
		className={cn('title-section', props.className)}>
		{props.children}
	</h2>
)

export const Bold = ({ className, children }: { className?: string; children: ReactNode }) => (
	<strong className={cn('text-interactive font-semibold', className)}>{children}</strong>
)
