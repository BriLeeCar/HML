'use client';

import { LayoutGroup } from 'motion/react';
import { cn } from '~/cn';
import { Icon } from '../Icon';
import { LinkColumn } from './FooterNav';
import { Logo } from './Logo';

const Links = [
	{
		columnTitle: 'our organization',
		links: [
			{ href: '/', children: 'About the Team' },
			{ href: '/', children: 'Privacy Policy' },
			{ href: '/', children: 'Accessibility' },
			{ href: '/', children: 'Contact Us' },
		],
	},
	{
		columnTitle: 'information hubs',
		links: [
			{ href: '/', children: 'Visas By Country' },
			{ href: '/', children: 'Asylum' },
			{ href: '/', children: 'Citizenship' },
			{ href: '/', children: 'Country Profiles' },
		],
	},
	{
		columnTitle: 'helpful resources',
		links: [
			{ href: '/', children: 'Fundraisers' },
			{ href: '/', children: 'Our Partners' },
			{ href: '/', children: 'Apply for Aid' },
		],
	},
];

export const Footer = ({ className }: Props<'footer'>) => {
	return (
		<footer
			className={cn(
				'relative bottom-0 flex flex-col items-center justify-start md:pt-6 gap-8',
				className,
			)}
		>
			<nav className='flex flex-col md:flex-row items-center  w-full'>
				<LayoutGroup>
					{Links.map((column, i) => (
						<LinkColumn key={i} column={column} />
					))}
				</LayoutGroup>
			</nav>
			<div className='mb-10 md:mb-16 md:my-2 flex flex-col md:flex-row justify-around w-full'>
				<Logo className='hidden md:flex ' />
				<Copyright />
				<LanguageSelector />
				<button
					className='bg-zinc-200 dark:bg-zinc-800 text-foreground shadow-sm rounded-full items-center flex justify-center pb-1 px-0.5 absolute bottom-4 left-4 cursor-pointer hover:bg-foreground hover:text-background transition-all'
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					title='Scroll to top'
				>
					<Icon IconName='ChevronDownIcon' className='rotate-180 h-10 w-auto' />
				</button>
			</div>
		</footer>
	);
};

const Copyright = () => {
	return (
		<div className='text-center text-sm italic text-gray-500'>
			©️ 2025 Help Me Leave. All rights reserved
		</div>
	);
};

const LanguageSelector = () => {
	return (
		<div className='text-center'>
			{/* <img
				className='w-[1.25rem] relative h-[0.831rem] object-cover'
				alt=''
				src='flags / US.png'
			/> */}
			English (US)
		</div>
	);
};
