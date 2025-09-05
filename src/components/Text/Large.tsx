import { cn } from '~/lib/cn'

export const Large = ({ ...props }: Props<'span'>) => {
	return (
		<span
			{...props}
			className={cn(
				'mx-auto block max-w-lg py-2 text-center text-lg',
				props.className
			)}
		/>
	)
}
