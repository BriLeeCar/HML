import { cn } from '~/lib/cn'

export const Form = ({ ...props }: Props<'form'>) => {
	return (
		<form
			{...props}
			className={cn('text-foreground grid w-full gap-y-16', props.className)}>
			{props.children}
		</form>
	)
}
