import { Button as HMLButton, Icon } from '~/components'
import { cn } from '~/lib/cn'

export const Button = ({
	iconOnly,
	innerButton = false,
	...props
}: Props<typeof HMLButton> & {
	iconOnly?: boolean
	innerButton?: boolean
}) => {
	return (
		<HMLButton
			{...props}
			className={cn(
				iconOnly ?
					'text-v2-red hover:text-v2-mulberry focus-visible:ring-offset-0'
				:	'ring-interactive dark:bg-v2-purple-brand bg-v2-slate rounded-lg text-sm text-white transition-colors hover:bg-[#42585E] dark:text-white dark:hover:bg-[#261A28]',
				innerButton
					&& 'dark:text-background dark:bg-v2-yellow text-v2-slate bg-v2-grey my-8 mr-12 ml-auto flex w-max items-center justify-center gap-x-2 text-center hover:bg-[#161B1D] hover:text-white dark:hover:bg-[#F0F4A8]',

				props.className
			)}
			type='button'
			variant='ghost'>
			{props.children}
		</HMLButton>
	)
}

export const RemoveButton = ({ ...props }: Props<typeof Button>) => {
	return (
		<Button
			{...props}
			type='button'
			iconOnly
			className={cn(
				'rounded-full px-1 py-0 transition-colors has-[svg]:py-1',
				'text-v2-red hover:bg-v2-red hover:text-white',
				'focus-visible:bg-v2-red',
				'focus-visible:-ring-offset-4 focus-visible:ring-transparent focus-visible:*:text-white',
				props.className
			)}>
			<Icon
				IconName='XIcon'
				className='h-fit w-fit'
				data-slot='icon'
				solid
			/>
		</Button>
	)
}

export const RemoveButtonWrapper = ({ ...props }: Props<'span'>) => {
	return (
		<span
			{...props}
			className={cn(
				'col-start-2 row-start-1 row-end-3 flex w-full self-center overflow-hidden *:mx-auto',
				props.className
			)}
		/>
	)
}

export const AddButton = ({ ...props }: Props<typeof Button>) => {
	return (
		<Button
			{...props}
			type='button'
			size='sm'
			innerButton>
			<Icon
				IconName='PlusCircleIcon'
				className='h-4 w-4 text-current/75'
				data-slot='icon'
				solid
			/>
			Add {props.children}
		</Button>
	)
}
