import { ElementType } from 'react';
import { cn } from '../util/cn';

export const Heading = ({
	level = 2,
	size = 'md',
	...props
}: Props<'h1'> & {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'title';
}) => {
	const Tag = `h${level}` as ElementType;
	return (
		<Tag
			{...props}
			className={cn(
				`text-gray-900 dark:text-gray-100 font-serif`,
				size === 'title'
					? 'text-5xl'
					: size === 'lg'
						? 'text-4xl'
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
