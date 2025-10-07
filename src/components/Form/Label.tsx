import { cn } from '~/lib/cn'

export const Label = ({ ...props }: Props<'label'>) => {
	return (
		<label
			data-slot='label'
			{...props}
			className={cn(
				'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				'*:[button]:click flex items-center gap-2',
				props.className
			)}>
			{props.children}
		</label>
	)
}
