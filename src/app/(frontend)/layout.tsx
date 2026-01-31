import { cn } from '@/lib/cn'
import '@/styles/old/www.css'
import type { ReactNode } from 'react'

const Layout = async ({
	children,
}: Readonly<{
	children: ReactNode
}>) => {
	return (
		<html>
			<body
				className={cn(
					'text-foreground relative h-screen overflow-x-hidden antialiased has-[#homepage]:overflow-hidden has-[main#homepage]:pb-0!'
				)}>
				{children}
			</body>
		</html>
	)
}

export default Layout
