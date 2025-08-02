import { ElementType } from 'react';
import { cn } from '~/util/cn';

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
	const Tag = `h${level}` as ElementType;
	return (
		<Tag
			{...props}
			className={cn(
				`text-gray-900 dark:text-purple-200 font-serif mt-6 font-normal mb-2`,
				size === 'title'
					? 'text-5xl'
					: size === 'lg'
						? 'text-3xl'
						: size === 'md'
							? 'text-2xl'
							: size === 'sm'
								? 'text-xl'
								: 'text-sm',
				props.className,
			)}
		/>
	);
};
