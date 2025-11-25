import { Button as HMLButton } from '~/components/Button'
import { Icon } from '~/components/Icon'
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
					'text-[#AC162B] hover:text-[#7A2235] focus-visible:outline-offset-0 focus-visible:outline-[#7A2235]'
				:	'rounded-lg bg-[#222D30] text-sm text-white transition-colors hover:bg-[#42585E] focus-visible:outline-[#AC162B] dark:bg-[#47274E] dark:text-white dark:hover:bg-[#261A28]',
				innerButton
					&& 'dark:text-background my-8 mr-12 ml-auto flex w-max items-center justify-center gap-x-2 bg-[#E9EDF3] text-center text-[#222D30] hover:bg-[#161B1D] hover:text-white dark:bg-[#DAE638] dark:hover:bg-[#F0F4A8]',

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
				'text-[#AC162B] hover:bg-[#AC162B] hover:text-white',
				'focus-visible:bg-[#AC162B]',
				'focus-visible:-outline-offset-4 focus-visible:outline-transparent focus-visible:*:text-white',
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
