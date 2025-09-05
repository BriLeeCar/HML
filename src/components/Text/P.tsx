import { cn } from '~/lib/cn'

export const P = ({ ...props }: Props<'p'>) => {
	return (
		<p
			{...props}
			className={cn(
				'leading-8 text-pretty [&:not(:first-child,:is(h1,h2,h3,h4,h5,h6)+p)]:mt-6',
				props.className
			)}
		/>
	)
}
