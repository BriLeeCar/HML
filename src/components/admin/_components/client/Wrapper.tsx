'use client'

import { toTitleCase } from '@/lib/toTitleCase'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { PageHeading } from '../'

type tBreadcrumb = {
	label: string
	href: string
}

export type tLayoutWrapperProps<T extends 'breadcrumbs' | 'eyebrow' | '' = ''> = {
	children: ReactNode
	title?: ReactNode
	subtitle?: ReactNode
} & Props<typeof PageHeading>
	& (T extends 'breadcrumbs' ?
		{
			breadcrumbs: tBreadcrumb[]
		}
	: T extends 'eyebrow' ?
		{
			eyebrow: ReactNode
		}
	:	{ eyebrow?: ReactNode | undefined })

const handleCrumbs = (path: string) => {
	return path
		.split('/')
		.filter(Boolean)
		.map(segment => ({ label: toTitleCase(segment.replace(/-/g, ' ')) as string, href: segment }))
}

const Breadcrumbs = ({
	items,
}: {
	items: Array<{
		label: string
		href: string
	}>
}) => {
	const joinCrumbs = (i: number) =>
		'/'
		+ items
			.slice(0, i + 1)
			.map(crumb => crumb.href)
			.join('/')

	return (
		<span
			className='eyebrow dark:text-hml-yellow-300 flex items-center gap-0 *:not-last:hover:underline'
			aria-label='Breadcrumb'>
			{items.map((item, index) => {
				const thisCrumb = joinCrumbs(index)
				return (
					<Fragment key={thisCrumb}>
						{index == items.length - 1 ?
							<span className='font-medium opacity-65'>{item.label}</span>
						:	<>
								<Link
									href={thisCrumb}
									className='focus-outline rounded leading-none'>
									{item.label}
								</Link>
								<span className='text-muted-foreground mx-1 font-bold opacity-75'>/</span>
							</>
						}
					</Fragment>
				)
			})}
		</span>
	)
}

export const LayoutWrapper = ({
	...props
}: tLayoutWrapperProps<'breadcrumbs' | 'eyebrow' | ''>) => {
	const { children, title, subtitle, eyebrow, ...rest } = props

	const path = usePathname()

	const crumbs = 'breadcrumbs' in props ? props.breadcrumbs : handleCrumbs(path || '/')

	return (
		<Fragment>
			<PageHeading
				{...rest}
				subtitle={subtitle ?? undefined}
				eyebrow={eyebrow ? eyebrow : <Breadcrumbs items={crumbs} />}>
				{title ?? toTitleCase(crumbs[crumbs.length - 1].label)}
			</PageHeading>
			{children}
		</Fragment>
	)
}
