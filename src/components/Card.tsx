import { Heading } from '~/components/Text/Heading'
import { cn } from '~/lib/cn'

const Card = ({ ...props }: Props<'article'>) => {
	return <CardWrapper {...props} />
}

const CardHeading = ({
	level,
	...props
}: Omit<Props<typeof Heading>, 'level'> & {
	level: Props<typeof Heading>['level']
}) => (
	<Heading
		level={level}
		{...props}
		className={cn('text-foreground mb-6 pl-0', props.className)}
		data-slot='card-head'
	/>
)

const CardWrapper = ({ ...props }: Props<'article'>) => {
	return (
		<article
			{...props}
			className={cn(
				'bg-card-background w-full overflow-hidden shadow-sm sm:rounded-lg',
				'px-4 py-5',
				'sm:p-6',
				'[&:has(>[data-slot*="card"])]:text-muted [&:has(>[data-slot*="card"])]:pt-0',
				props.className
			)}
		/>
	)
}

Card.Head = CardHeading

export { Card }
