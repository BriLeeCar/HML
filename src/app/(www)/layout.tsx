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
		<body className={cn('text-foreground relative overflow-hidden pb-4 antialiased')}>
			<Providers>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</Providers>
			<Analytics />
		</body>
	)
}

export default Layout
