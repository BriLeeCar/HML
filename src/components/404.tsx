'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icon'

export const NotFound404 = () => {
	const path = usePathname()
	const link =
		path?.includes('/admin') ?
			{
				href: '/admin',
				text: 'Admin Dashboard',
			}
		:	{
				href: '/',
				text: 'Homepage',
			}
	return (
		<Link
			href={link.href}
			className='mt-2 flex items-center gap-x-2 font-semibold'>
			<Icon IconName='ArrowLeftStrokeIcon' />
			Go to the {link.text}
		</Link>
	)
}
