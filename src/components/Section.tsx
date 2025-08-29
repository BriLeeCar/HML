import { cn } from '~/lib/cn'

export const Section = ({ ...props }: Props<'section'>) => {
	return (
		<section
			{...props}
			className={cn(
				'border-border/20 dark:bg-card/50 md:bg-card rounded-lg px-6 shadow-sm md:border-1',
				props.className
			)}
		/>
	)
}
