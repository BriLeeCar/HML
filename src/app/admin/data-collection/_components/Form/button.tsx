import { Button as HMLButton } from '~/components/Button'
import { cn } from '~/lib/cn'

export const Button = ({
	iconOnly,
	...props
}: Props<typeof HMLButton> & {
	iconOnly?: boolean
}) => {
	return (
		<HMLButton
			{...props}
			className={cn(
				iconOnly ?
					'text-[#47274E] hover:text-[#74447E] focus-visible:outline-offset-0 focus-visible:outline-[#47274E]'
				:	'dark:text-foreground rounded-lg bg-[#47274E] text-sm text-[#F0EBF1] transition-colors hover:bg-[#74447E] focus-visible:outline-offset-4 focus-visible:outline-[#47274E]',
				props.className
			)}
			type='button'
			variant='ghost'>
			{props.children}
		</HMLButton>
	)
}
