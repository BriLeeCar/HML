import type { ReactNode } from 'react'
import { Icon, Page } from '~/components'
import { cn } from '~/lib/cn'
import { Button } from './_components/Button'

const sideNav = [
	{ name: 'Dashboard', href: '/admin', icon: 'GlobeIcon', solid: true },
	{ name: 'Pathways', href: '/admin/data-collection/pathways', icon: 'UserCircleIcon' },
	{ name: 'Profile', href: '/admin/settings/profile', icon: 'UserCircleIcon', solid: true },
] as {
	name: string
	href: string
	icon: IconKey
	solid?: boolean
}[]

const Nav = () => {
	return (
		<nav className='admin bg-v2-slate text-v2-grey *:*:click sticky top-0 z-900 flex w-screen items-center justify-between p-2 dark:bg-[hsl(196,16%,12%)]'>
			<ul className='flex items-center gap-6'>
				{sideNav.map(item => (
					<li key={item.href}>
						<NavbarLink
							icon={item.icon as IconKey}
							href={item.href}
							solid={item.solid}>
							{item.name}
						</NavbarLink>
					</li>
				))}
			</ul>
			<NavbarLink
				icon='LogoutIcon'
				href='/admin/auth/signout'>
				Sign out
			</NavbarLink>
		</nav>
	)
}

const NavbarLink = ({
	icon,
	href,
	children,
	solid,
}: {
	icon: IconKey
	href: string
	children: string
	solid?: boolean
}) => {
	const className = cn(
		'inline-flex items-center text-xs',
		'text-v2-yellow hover:text-v2-slate',
		'hover:bg-v2-yellow',
		'focus-visible:ring-offset-0',
		'dark:hover:bg-v2-slate ring-v2-yellow dark:bg-transparent',
		'focus-visible:ring-2 dark:hover:brightness-110'
	)

	return (
		<Button
			prefetch={false}
			href={href}
			className={className}>
			<Icon
				IconName={icon}
				className='mr-2 size-4'
				solid={solid ?? undefined}
			/>
			{children}
		</Button>
	)
}

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Nav />
			<Page className='admin md:px-0'>{children}</Page>
		</>
	)
}
