import { cn } from '~/lib/cn'

export const Text = ({ ...props }: Props<'p'>) => {
	return (
		<section
			{...props}
			className={cn('leading-8 text-pretty', props.className)}
		/>
	)
}
