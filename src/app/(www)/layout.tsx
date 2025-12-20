import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import 'react'
import type { ReactNode } from 'react'
import { Providers } from '~/app/providers'
import { cn } from '~/lib/cn'
import { TRPCReactProvider } from '~/trpc/react'
import '../style.css'

export const metadata: Metadata = {
	title: {
		template: '%s | Help Me Leave',
		default: 'Help Me Leave',
	},
}

const Layout = async ({
	children,
}: Readonly<{
	children: ReactNode
}>) => {
	return (
		<body className={cn('text-foreground font-open-sans relative antialiased', 'pb-4')}>
			<Providers>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</Providers>
			<Analytics />
		</body>
	)
}

export default Layout
