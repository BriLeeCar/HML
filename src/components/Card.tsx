import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

const CardVariants = cva(
	'flex h-[100px] w-[150px] flex-col items-center justify-center rounded-lg p-4 shadow-sm *:w-full *:leading-none',
	{
		variants: {
			variant: {
				inverted: 'bg-accent text-accent-foreground',
				default: 'bg-foreground text-background',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

export const Card = ({
	variant,
	...props
}: Props<'aside'> & VariantProps<typeof CardVariants>) => {
	return (
		<aside
			{...props}
			className={cn(CardVariants({ variant }), props.className)}
		/>
	)
}
