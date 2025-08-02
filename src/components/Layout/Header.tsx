'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { usePortal } from '~/util/useModal';
import { Icon } from '../Icon';
import { Logo } from './Logo';

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const Mod = usePortal('menuModalPortal');

	const handleMenuClick = () => {
		if (menuOpen) {
			setMenuOpen(false);
		} else {
			setMenuOpen(true);
		}
	};

	return (
		<header className='w-3xl mx-auto flex items-start bg-zinc-150 dark:bg-zinc-950 lg:p-4 top-0 p-2 justify-between text-gray-700 dark:text-zinc-300  '>
			<Logo className='whitespace-nowrap absolute left-6' />
			<MobileMenuBtn handleMenuClick={handleMenuClick} />
			<TopNav />
			<RightNav />
			<Mod.Portal isOpen={menuOpen} handleClick={handleMenuClick}>
				Hey
			</Mod.Portal>
		</header>
	);
};

const topNavLinks = [
	{ href: '/', label: 'our mission' },
	{ href: '/', label: 'categories' },
	{ href: '/', label: 'resources' },
	{ href: '/', label: 'partners' },
];

const MobileMenuBtn = ({
	handleMenuClick,
}: {
	handleMenuClick: () => void;
}) => {
	return (
		<button
			id='mobileMenuBtn'
			className='text-gray-700 hover:text-gray-900 lg:hidden click'
			onClick={handleMenuClick}
		>
			<Icon IconName='HamburgerIcon' className='h-10 w-10' />
		</button>
	);
};

const TopNav = () => {
	return (
		<nav className='hidden lg:flex w-full whitespace-nowrap basis-full grow-1 text-center items-center justify-evenly'>
			{topNavLinks.map((link, i) => (
				<a
					key={i}
					href={link.href}
					className='font-normal uppercase transition hover:text-gray-900 dark:hover:text-gray-500'
				>
					{link.label}
				</a>
			))}
		</nav>
	);
};

const RightNav = () => {
	return (
		<div className='hidden lg:flex flex-col items-start justify-end gap-4 whitespace-nowrap fixed left-6 bottom-6'>
			{/* Add navigation items here */}
			<RightIcon />
		</div>
	);
};

const RightIcon = () => {
	const [open, setOpen] = useState(false);

	return (
		<button className='flex items-center uppercase hover:text-zinc-500'>
			<span className='relative' onClick={() => setOpen(!open)}>
				<Icon
					IconName='UserCircleIcon'
					solid
					className='z-1 h-10 w-10 absolute -left-[1px] click'
				/>
				<Icon
					IconName='UserCircleIcon'
					solid
					className='z-1 h-10 w-10 -ml-0.25 text-gray-800 [filter:blur(1px)]'
				/>
			</span>
			<AnimatePresence>
				{open && (
					<motion.span
						initial={{ width: 0 }}
						animate={{ width: 'auto' }}
						exit={{ width: 0 }}
						className='-ml-1.75 px-2 py-0.5 pt-0.75 text-xs border-[1.5px] border-zinc-500 text-zinc-300 tracking-widest rounded-r-lg overflow-hidden'
					>
						dashboard
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	);
};
