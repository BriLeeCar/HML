import { cn } from '~/lib/cn'

export const SidebarLabel = ({ ...props }: Props<'span'>) => (
	<span
		{...props}
		className={cn(props.className, 'truncate not-in-data-[open=true]:hidden')}
	/>
)
