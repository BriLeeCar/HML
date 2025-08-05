import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { Roboto, Roboto_Serif } from 'next/font/google';
import { cn } from '~/cn';
import { Layout } from '~/components/Layout/Base';
import theme from '~/styles/theme';
import '../styles/globals.css';

const roboto = Roboto({
	variable: '--font-roboto',
	weight: 'variable',
	subsets: ['latin', 'latin-ext'],
	style: ['italic', 'normal'],
});

const robotoSerif = Roboto_Serif({
	variable: '--font-roboto-serif',
	weight: 'variable',
	subsets: ['latin', 'latin-ext'],
	style: ['italic', 'normal'],
});

export const metadata: Metadata = {
	title: {
		template: 'Help Me Leave | %s',
		default: 'Help Me Leave',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<AppRouterCacheProvider options={{ enableCssLayer: true }}>
				<ThemeProvider theme={theme}>
					<Layout
						className={cn(
							'overflow-x-hidden',
							roboto.variable,
							robotoSerif.variable,
						)}
					>
						{children}
					</Layout>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</html>
	);
}
