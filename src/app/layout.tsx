import type { Metadata } from 'next'
import { Atkinson_Hyperlegible_Next, Open_Sans, Roboto } from 'next/font/google'
import 'react'

import { cn } from '~/lib/cn'

export const metadata: Metadata = {
	title: {
		template: 'HML | %s',
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
			className={cn(
				openSans.variable,
				headingFont.variable,
				subtitleFont.variable,
				'bg-background h-screen max-h-screen w-screen max-w-screen overflow-hidden'
			)}
			suppressHydrationWarning>
			{children}
		</html>
	)
}

export default RootLayout
