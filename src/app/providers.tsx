'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'
import { CountriesProvider } from '~/data/stores/countryStore'
import QueryProviders from '~/data/stores/store'

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
			<CountriesProvider>
				<QueryProviders>{children}</QueryProviders>
			</CountriesProvider>
		</ThemeProvider>
	)
}
