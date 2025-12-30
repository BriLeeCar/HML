import { Analytics } from '@vercel/analytics/next'
import 'react'

import { Providers } from '~/app/providers'
import { cn } from '~/lib/cn'
import '~/style/www.css'
import { TRPCReactProvider } from '~/trpc/react'

const Layout = async ({
	children,
}: Readonly<{
	children: ReactNode
}>) => {
	return (
		<body
			className={cn(
				'text-foreground relative h-screen overflow-x-hidden antialiased has-[#homepage]:overflow-hidden has-[main#homepage]:pb-0!'
			)}>
			<Providers>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</Providers>
			<Analytics />
		</body>
	)
}

export default Layout
