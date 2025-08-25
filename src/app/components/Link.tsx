import NextLink from 'next/link'
import { cn } from '~/lib/cn'

/**
 * 
 * @param size - The size of the link, can be 'sm', 'md', or 'lg'. Defaults to 'md'.
 * @param props - Additional properties to apply to the link.

 */
export const Link = ({ size = 'md', ...props }: Props.Link) => {
	return (
		<NextLink
			{...props}
			className={cn(
				size == 'sm' ? 'text-sm'
				: size == 'md' ? 'text-base'
				: 'text-lg',
				'underline decoration-2 underline-offset-2',
				'cursor-pointer',
				'decoration-muted-foreground/40 transition-colors hover:decoration-current',
				props.className
			)}>
			{props.children}
		</NextLink>
	)
}
