import { Button, Icon } from '~/components'

export const Filter = ({
	count,
	...props
}: Props<typeof Button> & { count: number }) => {
	return (
		<span className='*:click absolute right-20 flex gap-2'>
			<Button
				{...props}
				variant={'default'}
				size={'sm'}
				className='bg-muted text-muted-foreground text-sm font-semibold uppercase'>
				<Icon IconName='FilterIcon' />
				Filters ({count})
			</Button>
		</span>
	)
}
