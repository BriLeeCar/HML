import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
// import 'rehype-callouts/theme/github'
// import 'rehype-callouts/theme/obsidian'
import 'rehype-callouts/theme/vitepress'
import { cn } from '~/cn'
import '~/styles/globals.css'
import { Providers } from './providers'

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
	children: React.ReactNode
}>) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<head>
				<link
					rel='stylesheet'
					href='https://use.typekit.net/alq7mbw.css'
				/>
			</head>
			<body
				className={cn(
					openSans.variable,
					'bg-background text-foreground font-sans antialiased'
				)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}

export default RootLayout
