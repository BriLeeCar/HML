import { cn } from '~/lib/cn'

export const Bold = ({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) => (
	<strong
		className={cn(
			'text-brand-bright dark:text-brand-muted font-medium dark:font-normal',
			className
		)}>
		{children}
	</strong>
)
