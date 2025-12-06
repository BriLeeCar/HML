import type { tLayoutWrapperProps } from '@/admin/_lib/types'
import Link from 'next/link'
import { Fragment } from 'react'
import { Icon, PageHeading } from '~/components'

const Breadcrumbs = ({
	items,
}: {
	items: Array<{
		label: string
		href: string
	}>
}) => {
	return (
		<span className='text-v2-red dark:text-v2-yellow flex items-center gap-0 text-xs/4 font-normal italic *:hover:underline'>
			{items.map((item, index) => (
				<Fragment key={item.href}>
					<Link href={item.href}>{item.label}</Link>
					{index < items.length - 1 && (
						<Icon
							IconName='ArrowRightIcon'
							className='text-foreground/50 size-4'
						/>
					)}
				</Fragment>
			))}
		</span>
	)
}

export const LayoutWrapper = ({ ...props }: tLayoutWrapperProps<'breadcrumbs' | 'eyebrow'>) => {
	const { children, title, subtitle, eyebrow, ...rest } = props

	return (
		<Fragment>
			<PageHeading
				{...rest}
				subtitle={subtitle ?? undefined}
				eyebrow={
					eyebrow ? eyebrow
					: 'breadcrumbs' in props ?
						<Breadcrumbs
							items={[
								{ label: 'Admin', href: '/admin' },
								{ label: 'Users', href: '/admin/utilities/users' },
								{ label: 'New', href: '/admin/utilities/users/new' },
							]}
						/>
					:	undefined
				}>
				{title}
			</PageHeading>
			{children}
		</Fragment>
	)
}
