import { Button, Page } from '@/admin/_components'
import type { Metadata } from 'next'
import 'react'

import { Providers } from '~/app/providers'
import { Icon } from '~/components'
import { cn } from '~/lib/cn'
import '~/style/admin.css'
import { TRPCReactProvider } from '~/trpc/react'
import { MobileNav } from './_components/client/MobileNav'
import { Sidebar } from './_components/layout/Sidebar'
import { navList } from './_lib/navLinks'
import { UserRoleProvider } from './_providers/RoleProvider'

export const metadata: Metadata = {
	title: {
		template: '%s | Admin',
		default: 'Admin',
	},
}

const TopNav = () => {
	return (
		<nav className='admin bg-hml-slate-700 text-hml-grey-50 flex w-screen items-center justify-between p-2 md:hidden dark:bg-[hsl(196,16%,12%)]'>
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
		'text-hml-yellow-300 hover:text-hml-slate-700',
		'hover:bg-hml-yellow-300',
		'focus-visible:ring-offset-0',
		'dark:hover:bg-hml-slate-700 ring-hml-yellow-300 dark:bg-transparent',
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

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<body
			className={cn(
				'text-foreground relative grid h-screen max-h-screen grid-cols-1 grid-rows-[3rem_auto] flex-col overflow-clip antialiased md:grid-rows-1 dark:bg-[#17191C]'
			)}>
			<TopNav />
			<Providers>
				<TRPCReactProvider>
					<UserRoleProvider>
						<div className='grid max-h-[calc(100vh-3rem)] w-full gap-x-4 md:max-h-screen md:grid-cols-[3.5rem_auto] md:has-data-pinned:grid-cols-[14rem_auto]'>
							<Sidebar />
							<Page className='mx-auto flex w-full flex-col overflow-x-hidden overflow-y-auto *:last:mb-12'>
								{children}
							</Page>
						</div>
					</UserRoleProvider>
				</TRPCReactProvider>
			</Providers>
		</body>
	)
}
