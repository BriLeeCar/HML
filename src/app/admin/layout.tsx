import type { ReactNode } from 'react'
import { Button } from '~/components/index'

const sideNav = [
	{ name: 'Dashboard', href: '/admin' },
	{ name: 'Posts', href: '/admin/blog' },
	{ name: 'Profile', href: '/admin/settings/profile' },
]

const AdminLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<nav className='flex items-center justify-between px-4'>
				<ul className='flex items-center gap-6 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-neutral-900'>
					{sideNav.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className='text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'>
								{item.name}
							</a>
						</li>
					))}
				</ul>
				<Button
					href='/api/auth/signout'
					className='inline-flex'>
					Sign out
				</Button>
			</nav>
			<main className='m-6 min-h-screen dark:bg-neutral-800 dark:text-white'>
				{children}
			</main>
		</>
	)
}

export default AdminLayout
