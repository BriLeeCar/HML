import Link from 'next/link'

export const InlineLink = ({ ...props }: Props<typeof Link>) => (
	<Link
		{...props}
		className='text-foreground decoration-brand-bright/50 hover:text-brand-bright font-semibold underline decoration-2 underline-offset-2 transition-all dark:font-medium'
		prefetch={false}
	/>
)
