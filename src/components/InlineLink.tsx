import Link from 'next/link'

export const InlineLink = ({ ...props }: Props<typeof Link>) => (
	<Link
		{...props}
		className='text-muted-foreground hover:text-foreground font-medium underline decoration-current/50 decoration-1 underline-offset-2'
	/>
)
