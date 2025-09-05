import { cn } from '~/lib/cn'

export const Blockquote = ({ ...props }: Props<'blockquote'>) => (
	<blockquote
		{...props}
		className={cn(
			'border-accent-500 mx-8 my-4 border-l-4 pl-4 text-gray-500 italic',
			props.className
		)}
	/>
)
