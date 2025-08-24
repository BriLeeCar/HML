import { cn } from '~/cn'

export const Section = ({ ...props }: Props<'section'>) => {
	return (
		<section
			{...props}
			className={cn(
				'border-border dark:bg-card/50 rounded-lg border-1 bg-zinc-100 p-6 shadow-sm',
				props.className
			)}
		/>
	)
}
