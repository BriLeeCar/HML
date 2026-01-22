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
					'text-hml-red-500 hover:text-hml-mulberry-500 focus-visible:ring-offset-0'
				:	'ring-interactive dark:bg-hml-purple-700 bg-hml-slate-700 rounded-lg text-sm text-white transition-colors hover:bg-[#42585E] dark:text-white dark:hover:bg-[#261A28]',
				innerButton
					&& 'dark:text-background dark:bg-hml-yellow-300 text-hml-slate-700 bg-hml-grey-50 ml-auto flex w-full items-center justify-center gap-x-2 text-center hover:bg-[#161B1D] hover:text-white dark:hover:bg-[#F0F4A8]',

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
				'text-hml-red-500 hover:bg-hml-red-500 hover:text-white',
				'focus-visible:bg-hml-red-500',
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
			className='mx-auto mb-8 w-full max-w-sm'
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
