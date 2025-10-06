import type { ReactNode } from "react";

const sideNav = [
	{ name: "Dashboard", href: "/admin" },
	{ name: "Posts", href: "/admin/blog" },
	{ name: "Resources", href: "/admin/projects" },
	{ name: "Settings", href: "/admin/settings" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<nav>
				<ul className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-700 px-4 py-3 bg-white dark:bg-neutral-900">
					{sideNav.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
							>
								{item.name}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<main className="min-h-screen dark:bg-neutral-800 m-6 dark:text-white">
				{children}
			</main>
		</>
	);
};

export default AdminLayout;
