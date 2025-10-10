import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import 'react'
import 'rehype-callouts/theme/vitepress'
import { cn } from '~/lib/cn'
import { TRPCReactProvider } from '~/trpc/react'
import { Providers } from './providers'
import './style.css'

export const metadata: Metadata = {
	title: {
		template: '%s | Help Me Leave',
		default: 'Help Me Leave',
	},
}

const openSans = Open_Sans({
	variable: '--font-open-sans',
	weight: 'variable',
	subsets: ['latin', 'latin-ext'],
	style: ['normal', 'italic'],
	adjustFontFallback: true,
})

const RootLayout = async ({ children }: LayoutProps<'/'>) => {
	return (
		<html
			lang='en'
			className={cn(openSans.variable)}
			suppressHydrationWarning>
			<body
				className={cn(
					'text-foreground bg-background relative font-sans antialiased',
					'pb-4'
				)}>
				<TRPCReactProvider>
					<Providers>{children}</Providers>
				</TRPCReactProvider>
				<Analytics />
			</body>
		</html>
	)
}

export default RootLayout
