import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import 'react'
import { ReactNode } from 'react'
import 'rehype-callouts/theme/vitepress'
import { cn } from '~/lib/cn'
import { Providers } from './providers'
import './style.css'

export const metadata: Metadata = {
	title: {
		template: 'Help Me Leave | %s',
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

const RootLayout = async ({
	children,
}: Readonly<{
	children: ReactNode
}>) => {
	return (
		<html
			lang='en'
			className={cn(openSans.variable)}
			suppressHydrationWarning>
			<head>
				<link
					rel='stylesheet'
					href='https://use.typekit.net/alq7mbw.css'
				/>
			</head>
			<body
				className={cn(
					'text-foreground bg-background relative font-sans antialiased',
					'pb-4'
				)}>
				<Providers>{children}</Providers>
				<Analytics /> {/* Vercel Analytics */}
			</body>
		</html>
	)
}

export default RootLayout
