import { ElementType } from 'react'
import { cn } from '~/util/cn'

/**
 *
 * @param props - General props for the heading element.
 * @param level - The heading level (1-6) to render. Defaults to 2.
 * @param size - The size of the heading, which affects the font size.
 *               Options are 'xs', 'sm', 'md', 'lg', and 'title'.
 *               Defaults to 'md'.
 * @return A heading element (`h1` to `h6`) with the specified level and size.
 */

export const Heading = ({
	level = 2,
	size = 'md',
	...props
}: Props.Heading) => {
	const Tag = `h${level}` as ElementType
	return (
		<Tag
			{...props}
			className={cn(
				`text-foreground dark:text-accent-foreground mt-6 mb-2 font-serif font-bold [:is(h1,h2,h3,h4,h5,h6)>*:first-child>*:is(h1,h2,h3,h4,h5,h6)]:text-red-500`,
				level == 2
					&& 'scroll-m-20 border-b-1 pb-2 font-semibold tracking-tight first:mt-0',
				size == 'title' ? 'font-heading text-7xl'
				: size == '2xl' ? 'text-5xl'
				: size == 'xl' ? 'text-4xl'
				: size == 'lg' ? 'text-3xl'
				: size == 'md' ? 'text-2xl'
				: size == 'sm' ? 'text-xl'
				: 'text-sm',
				props.className
			)}
		/>
	)
}
