'use client'

import { usePathname } from 'next/navigation'
import { Icon } from '~/components/Icon'
import { Button } from '~/components/ui'

export const SideBtns = () => {
	const path = usePathname()
	if (path != '/')
		return (
			<span
				className='bg-card no-print inverted fixed top-20 left-2 z-50 flex w-max items-center gap-2 rounded-lg px-1 py-2 shadow-sm'
				id='mainSideBtns'>
				<Button
					onClick={() => window.print()}
					variant={'destructive'}
					title='Print this page'
					size={'icon'}>
					<Icon
						IconName='PrinterIcon'
						className='click h-10 w-10'
					/>
				</Button>
			</span>
		)
}
