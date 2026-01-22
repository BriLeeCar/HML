'use client'

import { usePathname } from 'next/navigation'
import { cn } from '~/lib/cn'
import { Icon } from '../Icon'

export const PageBreadcrumb = ({ ...props }: Props<'nav'>) => {
	const path = usePathname().split('/').filter(Boolean)

	return (
		<nav className='text-hml-red'>
			{path.map((segment, index) => {
				const isLast = index === path.length - 1
				const segmentName = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

				return (
					<span
						key={index}
						className={cn('text-sm italic', isLast && 'font-semibold', props.className)}>
						{segmentName}
						{!isLast && (
							<Icon
								IconName='ChevronRightIcon'
								className='mx-2 inline h-4 w-4 text-gray-400'
							/>
						)}
					</span>
				)
			})}
		</nav>
	)
}
