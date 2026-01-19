import { cn } from '~/lib/cn'

export const Bold = ({ className, children }: { className?: string; children: ReactNode }) => (
	<strong
		className={cn(
			'text-hml-red dark:text-hml-yellow-500 font-semibold dark:font-normal',
			className
		)}>
		{children}
	</strong>
)
