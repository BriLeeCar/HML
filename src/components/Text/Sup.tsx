import { cn } from '~/lib/cn'

export const Sup = ({ ...props }: Props<'sup'>) => (
	<sup
		{...props}
		className={cn('text-hml-red *:text-xs *:no-underline *:[a]:decoration-0', props.className)}
	/>
)
