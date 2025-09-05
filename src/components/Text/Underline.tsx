import { cn } from '~/lib/cn'

export const U = ({ ...props }: Props<'u'>) => (
	<span
		{...props}
		className={cn(
			'underline decoration-current/30 underline-offset-2',
			props.className
		)}
	/>
)
