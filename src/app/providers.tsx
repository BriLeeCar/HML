'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'
import { CountryStoreProvider } from '~/data/stores/countryStore'

const ThemeProvider = ({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
	return (
		<NextThemesProvider {...props}>{children}</NextThemesProvider>
	)
}

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeProvider
			attribute={'class'}
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange>
			<CountryStoreProvider>{children}</CountryStoreProvider>
		</ThemeProvider>
	)
}
