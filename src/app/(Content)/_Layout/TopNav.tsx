'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '~/cn'
import { TouchTarget } from '~/components/ui'
import {
	Books,
	Certificate,
	HeartMap,
	HML,
	Mission,
	Support,
} from './SVG'

const links = [
	{
		text: 'Resource Map',
		Icon: HeartMap,
		href: '/map',
	},
	{
		text: 'Visa & Asylum',
		Icon: Certificate,
		href: '/',
	},
	{
		text: 'Guides & Resources',
		Icon: Books,
		href: '/',
	},
	{
		text: 'Support Team',
		Icon: Support,
		href: '/',
	},
	{
		text: 'Our Mission',
		Icon: Mission,
		href: '/',
	},
]

const NavMenuItem = ({
	Icon,
	active,
	...props
}: Props.Link & {
	Icon: (typeof links)[number]['Icon']
	active: boolean
}) => {
	return (
		<Link
			{...props}
			className={cn(
				'hover:bg-foreground/10 flex h-full gap-3 rounded-lg px-3 transition-all',
				active
					&& 'text-background bg-foreground/80 hover:bg-foreground/80',
				props.className
			)}
			title={props.children as string}>
			<Icon className={cn('h-4 w-4 stroke-[1.25px]')} />
			<TouchTarget>
				<span>{props.children}</span>
			</TouchTarget>
		</Link>
	)
}

export const NavMenu = () => {
	const active = usePathname()

	return (
		<nav
			className={cn(
				// 'xs:bg-purple-200 sm:bg-red-200 md:bg-blue-200 lg:bg-amber-200 xl:bg-green-200',
				'flex w-full overflow-hidden',
				'text-sidebar-foreground z-99 text-xs font-semibold tracking-tight uppercase italic'
			)}>
			<Link href='/'>
				<HML className='text-foreground flex h-full w-auto items-center gap-0 px-4 py-1 text-3xl font-bold -tracking-widest' />
			</Link>
			<menu className='flex w-full items-center gap-1'>
				{links.map((link, index) => (
					<NavMenuItem
						key={index}
						href={link.href}
						active={active === link.href}
						className='flex grow items-center justify-start gap-2'
						Icon={link.Icon}
						title={link.text}>
						{link.text}
					</NavMenuItem>
				))}
			</menu>
		</nav>
	)
}
