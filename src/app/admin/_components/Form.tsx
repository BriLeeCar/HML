import { cn } from '~/lib/cn'

const Form = ({ ...props }: Props<'form'>) => {
	return (
		<form
			{...props}
			className={cn(
				'text-foreground mx-auto mt-8 flex w-full flex-col gap-8 py-8',
				props.className
			)}>
			{props.children}
		</form>
	)
}

export { Form }
