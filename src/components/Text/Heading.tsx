import { cn } from '~/lib/cn'

/**
 *
 * @param props - General props for the heading element.
 * @param level - The heading level (1-6) to render. Defaults to 2.
 * @param size - The size of the heading, which affects the font size.
 *               Options are 'xs', 'sm', 'md', 'lg', and 'title'.
 *               Defaults to 'md'.
 *
 * @returns A heading element (`h1` to `h6`) with the specified level and size.
 *
 * @category Components - Text
 */

export const Heading = ({ level = 2, size = 'md', ...props }: Props.Heading) => {
	const className = cn(
		`text-foreground mt-6 mb-2 font-sans font-bold tracking-tighter dark:text-white`,
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
	<div className='max-w-4xl'>
		{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
		<PageTitle {...props}>{children}</PageTitle>
		{subtitle && <Subtitle>{subtitle}</Subtitle>}
	</div>
)

const PageTitle = ({ ...props }) => (
	<h1
		className={cn(
			'mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 capitalize sm:text-5xl dark:text-white',
			props.className
		)}>
		{props.children}
	</h1>
)

export const Subtitle = ({ ...props }: Props<'p'>) => (
	<p className={cn('mt-6 text-xl/8 text-gray-700 dark:text-gray-300', props.className)}>
		{props.children}
	</p>
)

const Eyebrow = ({ ...props }: Props<'p'>) => {
	return (
		<p
			className={cn(
				'text-brand-bright text-base/7 font-semibold dark:text-[#f3736c]',
				props.className
			)}>
			{props.children}
		</p>
	)
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
			<hgroup className='mb-0'>
				{eyebrow && <Eyebrow className='text-sm/8'>{eyebrow}</Eyebrow>}
				<SectionHeadingInner {...props} />
				{subtitle && <Subtitle className='text-lg md:mt-4'>{subtitle}</Subtitle>}
			</hgroup>
		)
	}
	return <SectionHeadingInner {...props} />
}
const SectionHeadingInner = ({ ...props }: Props<'h2'>) => (
	<h2
		{...props}
		className={cn(
			'text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white',
			props.className
		)}>
		{props.children}
	</h2>
)
