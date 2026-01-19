import { cn } from '~/lib/cn'

export const Main = ({ full, children, ...props }: Props & { full?: boolean }) => (
	<main
		{...props}
		className={cn(
			'h-fill mx-auto mt-8 mb-8 flex flex-col justify-center',
			!full && 'w-screen px-2 sm:px-6 md:max-w-3xl lg:max-w-5xl lg:px-8',
			props.className
		)}>
		{children}
	</main>
)
