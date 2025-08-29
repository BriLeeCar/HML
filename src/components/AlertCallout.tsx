import { cn } from '~/lib/cn'
import { Icon } from './Icon'

export const AlertCallout = ({ ...props }: Props) => {
	return (
		<span
			{...props}
			className={cn(
				'my-2 grid w-full grid-cols-[auto_1fr] justify-start gap-4 border-l-4 border-red-500 bg-red-100/50 p-4 text-sm text-red-900 italic dark:bg-red-950/10 dark:text-zinc-300',
				props.className
			)}>
			<Icon
				IconName='AlertTriangleIcon'
				className='h-5 w-5 text-red-500'
			/>
			<span className='block'>{props.children}</span>
		</span>
	)
}
