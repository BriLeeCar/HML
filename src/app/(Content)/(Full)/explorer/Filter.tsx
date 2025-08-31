import { Button, Icon } from '~/components'
import { cn } from '~/lib/cn'

export const FilterBtn = ({
	count,
	...props
}: Props<typeof Button> & { count: number }) => {
	return (
		<Button
			{...props}
			className={cn(
				'rounded-md bg-red-800 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap text-white shadow-xs hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400 dark:focus-visible:outline-zinc-500',
				props.className
			)}>
			<Icon IconName='FilterIcon' />
			<span className='lg:hidden'>Filters ({count})</span>
			<span className='hidden lg:block'>
				EXPLORER FILTERS ({count})
			</span>
		</Button>
	)
}
