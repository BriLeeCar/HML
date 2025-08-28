import { Button, Icon } from '~/components'
import { cn } from '~/lib/cn'

export const FilterBtn = ({
	count,
	...props
}: Props<typeof Button> & { count: number }) => {
	return (
		<Button
			{...props}
			variant={'default'}
			size={'sm'}
			className={cn(
				'bg-muted text-muted-foreground text-sm font-semibold uppercase',
				props.className
			)}>
			<Icon IconName='FilterIcon' />
			Filters ({count})
		</Button>
	)
}
