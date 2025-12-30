import { InlineLink as Link } from '~/components'
import { cn } from '~/lib/cn'

export const InlineLink = ({ ...props }: Props<typeof Link>) => {
	return (
		<Link
			{...props}
			className={cn(
				'text-muted decoration-interactive hover:text-foreground hover:decoration-foreground link-focus [font-size:inherit]',
				props.className
			)}
		/>
	)
}
