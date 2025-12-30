import { Page } from '@/admin/_components'
import type { Metadata } from 'next'
import 'react'

import { cn } from '~/lib/cn'
import '~/style/admin.css'

export const metadata: Metadata = {
	title: {
		template: '%s | Join',
		default: 'Join',
	},
}

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<body
			className={cn(
				'text-foreground admin relative grid h-screen max-h-screen grid-cols-1 grid-rows-1 flex-col overflow-clip antialiased dark:bg-[#17191C]'
			)}>
			<div className='grid h-screen max-h-screen w-full grid-cols-1 gap-x-4 overflow-x-hidden overflow-y-auto'>
				<Page className='mx-auto w-full max-w-2xl grid-rows-[repeat(1,min-content)] gap-y-8 *:last:mb-12'>
					{children}
				</Page>
			</div>
		</body>
	)
}
