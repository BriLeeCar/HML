import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'

export const FilterBtn = ({ count, ...props }: Props<'button'> & { count: number }) => {
	return (
		<Button
			{...props}
			variant='default'
			className={cn('relative mt-8 mb-4 flex items-center gap-2', props.className)}>
			<Icon
				solid
				IconName='FilterIcon'
				className='size-5'
			/>
			<span className='lg:hidden'>Filters ({count})</span>
			<span className='hidden lg:flex'>EXPLORER FILTERS ({count})</span>
		</Button>
	)
}
