import { InlineLink as Link } from '~/components'
import { cn } from '~/lib/cn'

export const InlineLink = ({ ...props }: Props<typeof Link>) => {
	return (
		<Link
			{...props}
			className={cn(
				'text-v2-muted decoration-interactive hover:text-v2-foreground hover:decoration-interactive-secondary link-focus',
				props.className
			)}
		/>
	)
}
