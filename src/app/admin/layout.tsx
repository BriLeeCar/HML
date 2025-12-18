import { Button, Page } from '@/admin/_components'
import type { ReactNode } from 'react'
import { Icon } from '~/components'
import { cn } from '~/lib/cn'
import { MobileNav } from './_components/client/MobileNav'
import { navList } from './_lib/navLinks'

const Nav = () => {
	return (
		<nav className='admin bg-v2-slate-700 text-v2-grey-50 sticky top-0 z-900 flex w-screen items-center justify-between p-2 dark:bg-[hsl(196,16%,12%)]'>
			<ul className='hidden items-center gap-6 md:flex'>
				{navList.map(item => (
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
			<MobileNav />
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
		'max-sm:hidden',
		'inline-flex items-center text-xs',
		'text-v2-yellow-300 hover:text-v2-slate-700',
		'hover:bg-v2-yellow-300',
		'focus-visible:ring-offset-0',
		'dark:hover:bg-v2-slate-700 ring-v2-yellow-300 dark:bg-transparent',
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
			<Page className='admin w-4xl max-w-full overflow-hidden'>{children}</Page>
		</>
	)
}
