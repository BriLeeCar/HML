import { Button, Icon } from '~/components'

export const FilterBtn = ({
	count,
	...props
}: Props<typeof Button> & { count: number }) => {
	return (
		<Button
			{...props}
			variant={'default'}
			size={'sm'}
			className='bg-muted text-muted-foreground text-sm font-semibold uppercase'>
			<Icon IconName='FilterIcon' />
			Filters ({count})
		</Button>
	)
}
