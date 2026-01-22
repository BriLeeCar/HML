import { Analytics } from '@vercel/analytics/next'
import 'react'

import { Providers } from '~/app/providers'
import { env } from '~/env'
import { cn } from '~/lib/cn'
import '~/style/www.css'

const Layout = async ({
	children,
}: Readonly<{
	children: ReactNode
}>) => {
	const useAnalytics = env.NODE_ENV == 'production'

	return (
		<body
			className={cn(
				'text-foreground relative h-screen overflow-x-hidden antialiased has-[#homepage]:overflow-hidden has-[main#homepage]:pb-0!'
			)}>
			<Providers>{children}</Providers>
			{useAnalytics && <Analytics />}
		</body>
	)
}

export default Layout
