'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TouchTarget } from '~/components'
import { cn } from '~/lib/cn'
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
		href: '/explorer',
	},
	{
		text: 'Guides & Resources',
		Icon: Books,
		href: '/',
	},
	{
		text: 'Support Team',
		Icon: Support,
		href: '/support',
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
				'hover:bg-background/50 flex h-full gap-3 rounded-lg px-3 transition-all',
				active
					&& 'text-background bg-foreground/80 hover:bg-foreground/80',
				props.className
			)}
			{...(active && { 'data-active': '' })}
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
				'text-sidebar-foreground z-99 bg-zinc-200/70 py-2 text-xs font-semibold tracking-tight uppercase italic dark:bg-zinc-900'
			)}>
			<Link href='/'>
				<HML className='text-foreground flex h-full w-auto items-center gap-0 px-4 py-1 text-3xl font-bold -tracking-widest' />
			</Link>
			<menu className='flex w-full items-center justify-around'>
				{links.map((link, index) => (
					<NavMenuItem
						key={index}
						href={link.href}
						active={active === link.href}
						className='flex items-center justify-between gap-2'
						Icon={link.Icon}
						title={link.text}>
						{link.text}
					</NavMenuItem>
				))}
			</menu>
		</nav>
	)
}
