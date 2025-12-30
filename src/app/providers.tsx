'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

import { DBProvider } from '~/server/db/provider'

const ThemeProvider = ({ children, ...props }: ComponentProps<typeof NextThemesProvider>) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeProvider
			attribute={'class'}
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange>
			<DBProvider>{children}</DBProvider>
		</ThemeProvider>
	)
}
