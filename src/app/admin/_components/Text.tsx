import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

export const Main = ({ full, children, ...props }: Props & { full?: boolean }) => (
	<main
		{...props}
		className={cn(full && '', 'h-fill mx-auto', props.className)}>
		{children}
	</main>
)

export const Page = ({ ...props }: Props) => (
	<Main
		{...props}
		className={cn('mt-8 grid grid-cols-1 gap-y-12 px-4', props.className)}
	/>
)

export const Section = ({ ...props }: Props<'section'>) => (
	<section
		{...props}
		className={cn('grid gap-y-8', props.className)}>
		{props.children}
	</section>
)

export const Heading = ({ level = 2, size = 'md', ...props }: Props.Heading) => {
	const className = cn(
		`text-foreground dark:text-accent-foreground mt-6 mb-2 font-sans font-bold tracking-tighter`,
		size == 'title' && 'text-4xl font-black',
		size == '2xl' && 'text-5xl',
		size == 'xl' && 'text-3xl',
		size == 'lg' && 'text-muted-foreground text-xl brightness-75',
		props.className
	)

	if (level == 1) {
		return (
			<h1
				{...props}
				className={className}
			/>
		)
	}
	if (level == 2) {
		return (
			<h2
				{...props}
				className={className}
			/>
		)
	}
	if (level == 3) {
		return (
			<h3
				{...props}
				className={className}
			/>
		)
	}
	if (level == 4) {
		return (
			<h4
				{...props}
				className={className}
			/>
		)
	}
	if (level == 5) {
		return (
			<h5
				{...props}
				className={className}
			/>
		)
	}
	return (
		<h6
			{...props}
			className={className}
		/>
	)
}

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
	<header className='title-page'>
		{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
		<PageTitle {...props}>{children}</PageTitle>
		{subtitle && <Subtitle>{subtitle}</Subtitle>}
	</header>
)

const PageTitle = ({ ...props }) => <h1 className={props.className}>{props.children}</h1>

export const Subtitle = ({ ...props }: Props<'p'>) => (
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
			<header className='title-section'>
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
