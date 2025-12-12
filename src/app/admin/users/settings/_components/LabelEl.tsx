import { Label } from '@/admin/_components/catalyst'
import { cn } from '~/lib/cn'

export const ThisLabelEl = ({ ...props }: Props<typeof Label>) => {
	return (
		<Label
			{...props}
			className={cn('sm:text-base', props.className)}
		/>
	)
}
