import { type ReactNode } from 'react';
import { cn } from '~/cn';
import { Heading } from './Heading';

/**
 *
 * @param props - General section props to apply to the section element.
 *
 * Section component that serves as a wrapper for content sections.
 *
 * @returns
 * A section element with optional heading and brow text.
 * To use with a heading, use `Section.Heading` as a child component.
 * If you want to add a brow (subtitle) to the heading, pass it as a prop to `Section.Heading`.
 */

const Section = ({ ...props }) => {
	return <section {...props} />;
};

Section.Heading = ({
	children,
	brow,
	level = 2,
	size = 'md',
	...props
}: Props.Heading & { brow?: ReactNode }) => {
	return brow ? (
		<hgroup>
			<Heading
				{...props}
				level={level}
				size={size}
				className={cn(
					brow && 'border-b-2 border-accent-200 leading-none mb-0.5 ',
					props.className,
				)}
			>
				{children}
			</Heading>

			<p className='font-medium uppercase text-xs tracking-wide px-4 text-end text-zinc-500'>
				{brow}
			</p>
		</hgroup>
	) : (
		<Heading
			{...props}
			level={level}
			size={size}
			className={cn(
				brow && 'border-b-2 border-accent-200 leading-none mb-0.5 ',
				props.className,
			)}
		>
			{children}
		</Heading>
	);
};

export { Section };
