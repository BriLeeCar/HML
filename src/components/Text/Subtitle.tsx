import { cn } from '~/lib/cn'

export const Subtitle = ({ ...props }: Props<'p'>) => (
	<p className={cn('text-gray-500 dark:text-gray-300', props.className)}>{props.children}</p>
)
