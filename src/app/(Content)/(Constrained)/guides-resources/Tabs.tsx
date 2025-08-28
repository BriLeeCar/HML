'use client'

import { useState } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'

const tabs = [
	{ name: 'Member Blog', href: '#member-blogs', count: '52' },
	{
		name: 'Outside Resources',
		href: '#',
		count: '6',
	},
	{ name: 'Guides & How-Tos', href: '#', count: '4' },
]

export const Tabs = () => {
	const [selectedTab, setSelectedTab] = useState('')

	return (
		<div className='my-6'>
			<div className='sm:max-w-auto grid max-w-sm grid-cols-1 sm:hidden'>
				<select
					defaultValue={selectedTab}
					onChange={(e) => setSelectedTab(e.target.value)}
					aria-label='Select a tab'
					className='bg-background text-foreground outline-border col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-8 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600'>
					{tabs.map((tab) => (
						<option
							key={tab.name}
							value='tab.href'>
							{tab.name}
						</option>
					))}
				</select>
				<Icon
					IconName='ChevronDownIcon'
					aria-hidden='true'
					className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-zinc-500'
				/>
			</div>
			<div className='hidden sm:block'>
				<div className='border-muted-foreground/50 border-b'>
					<nav
						aria-label='Tabs'
						className='-mb-px flex space-x-8'>
						{tabs.map((tab) => (
							<a
								key={tab.name}
								href={tab.href}
								aria-current={
									selectedTab == tab.href ? 'page' : undefined
								}
								className={cn(
									selectedTab == tab.href ?
										'border-red-500 text-red-600 dark:border-red-800 dark:text-red-400'
									:	'text-muted-foreground border-transparent hover:border-zinc-200 hover:text-zinc-700 dark:hover:text-zinc-200',
									'flex border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap'
								)}>
								{tab.name}
								{tab.count ?
									<span
										className={cn(
											selectedTab == tab.href ?
												'bg-red-100 text-red-600'
											:	'bg-zinc-100 text-zinc-900',
											'ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block'
										)}>
										{tab.count}
									</span>
								:	null}
							</a>
						))}
					</nav>
				</div>
			</div>
		</div>
	)
}
