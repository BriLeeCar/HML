import type { Metadata } from 'next'
import { Atkinson_Hyperlegible_Next, Open_Sans, Roboto } from 'next/font/google'
import 'react'
import type { ReactNode } from 'react'
import 'rehype-callouts/theme/vitepress'
import { cn } from '~/lib/cn'

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

const headingFont = Atkinson_Hyperlegible_Next({
	variable: '--font-atkinson-hyperlegible',
	weight: 'variable',
	subsets: ['latin'],
	style: ['normal', 'italic'],
})

const subtitleFont = Roboto({
	variable: '--font-roboto',
	weight: ['100', '200', '300'],
	subsets: ['latin'],
	style: ['normal', 'italic'],
})

const RootLayout = async ({
	children,
}: Readonly<{
	children: ReactNode
}>) => {
	return (
		<html
			lang='en'
			className={cn(openSans.variable, headingFont.variable, subtitleFont.variable)}
			suppressHydrationWarning>
			{children}
		</html>
	)
}

export default RootLayout
