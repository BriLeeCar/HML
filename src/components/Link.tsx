import NextLink from 'next/link';
import { cn } from '../util/cn';

export const Link = ({
	size = 'md',
	...props
}: Props<typeof NextLink> & { size: 'sm' | 'md' | 'lg' }) => {
	return (
		<NextLink
			{...props}
			className={cn(
				size == 'sm' ? 'text-sm' : size == 'md' ? 'text-base' : 'text-lg',
				'underline decoration-2 underline-offset-2',
				' cursor-pointer',
				'decoration-purple-500 hover:decoration-purple-500/30 transition-colors',
				props.className,
			)}
		>
			{props.children}
		</NextLink>
	);
};
