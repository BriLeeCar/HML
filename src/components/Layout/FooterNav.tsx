import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '~/cn';
import { Icon, Link, TouchTarget } from '~/components';

type NavColumn = {
	columnTitle: string;
	links: Props.Link[];
};

export const LinkColumn = ({ column }: { column: NavColumn }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<MdLinkColumn column={column} />
			{/* <SmLinkColumn column={column} open={open} setOpen={setOpen} /> */}
		</>
	);
};

const MdLinkColumn = ({ column }: { column: NavColumn }) => {
	return (
		<div className='hidden md:flex flex-col justify-start h-fill items-stretch basis-full text-center'>
			<b className='pt-4 pb-2 uppercase tracking-wider font-semibold w-full text-accent-800 dark:text-accent-300 text-sm'>
				{column.columnTitle}
			</b>
			<div className='flex flex-col gap-2 items-center pb-6'>
				{column.links.map((l, i) => {
					return (
						<Link
							key={i}
							href={l.href}
							className='uppercase tracking-wide text-gray-600 dark:text-gray-300 font-semibold text-xs no-underline hover:opacity-50'
						>
							{l.children}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

const SmLinkColumn = ({
	setOpen,
	open,
	column,
}: {
	setOpen: (open: boolean) => void;
	open: boolean;
	column: {
		columnTitle: string;
		links: Props.Link[];
	};
}) => {
	return (
		<div className='md:hidden flex flex-col items-center justify-start w-full my-0.25 '>
			<button
				className='flex uppercase tracking-widest  bg-zinc-200 w-full click hover:bg-foreground/80 font-medium items-center text-foreground'
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-controls={`footer-nav-${column.columnTitle.toLowerCase().replace(/\s+/g, '-')}`}
			>
				<TouchTarget>
					<span className='basis-full py-6 '>{column.columnTitle}</span>
					<motion.span
						style={{
							rotate: open ? 0 : -90,
						}}
						className={'shrink-1 absolute right-4'}
					>
						<Icon IconName='ChevronDownIcon' className={cn('h-10 w-auto')} />
					</motion.span>
				</TouchTarget>
			</button>
			<AnimatePresence>
				{open && (
					<motion.menu
						layout
						initial={{
							height: 0,
						}}
						animate={{
							height: 'auto',
						}}
						exit={{
							height: 0,
						}}
						className='flex flex-col items-center overflow-hidden w-full'
					>
						{column.links.map((l, i) => {
							return (
								<NavLink
									key={i}
									{...l}
									className='w-full text-center border-t-1 py-6 border-black/10 hover:text-accent-600 last:border-b-1'
								/>
							);
						})}
					</motion.menu>
				)}
			</AnimatePresence>
		</div>
	);
};

const NavLink = ({ ...props }: Props.Link) => (
	<Link
		{...props}
		className={cn(
			'uppercase tracking-wide text-gray-500 font-semibold',
			props.className,
		)}
	/>
);
