import { cn } from '~/lib/cn'

export const Eyebrow = ({ ...props }: Props<'p'>) => {
	return (
		<p className={cn('text-hml-slate-500 dark:text-hml-yellow font-semibold', props.className)}>
			{props.children}
		</p>
	)
}
