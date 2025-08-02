import type { Metadata } from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import { Layout } from '~/components/Layout/Base';
import '../styles/globals.css';

const interSans = Inter({
	variable: '--font-inter-sans',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

const abril = Noto_Serif({
	variable: '--font-playfair',
	weight: 'variable',
	subsets: ['latin'],
	style: 'normal',
	display: 'swap',
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
			<Layout className={`${interSans.variable} ${abril.variable}`}>
				{children}
			</Layout>
		</html>
	);
}
