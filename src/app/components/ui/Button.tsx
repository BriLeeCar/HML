import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '~/lib/cn'

const buttonVariants = cva(
	[
		'click',
		// !! FOCUS VISUALS
		'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',

		// !! RING VISUALS
		'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

		// !! SIZING & SPACING
		'inline-flex shrink-0 items-center justify-center gap-2',

		// !! BORDER
		'rounded-md outline-none',

		// !! TEXT
		'text-sm font-medium whitespace-nowrap transition-all',

		'disabled:pointer-events-none disabled:opacity-50',
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	],
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
				destructive:
					'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs',
				outline:
					'bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs',
				secondary:
					'bg-btn-secondary text-btn hover:bg-secondary/80 focus-visible:ring-destructive ring-offset-2',
				primary:
					'bg-btn-primary text-btn hover:bg-btn-primary/90 focus-visible:ring-foreground/50 shadow-black ring-offset-2',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
				lg: 'min-h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

type tBtnProps<T extends 'button' | 'link'> = VariantProps<
	typeof buttonVariants
> & {
	as?: T
	asChild?: boolean
} & (T extends 'link' ?
		Omit<Props.Link, 'as'> & { as: 'link'; href: string }
	: T extends 'button' ? Props<'button'>
	: never)

export const Button = ({
	className,
	variant,
	size,
	asChild = false,
	as,
	...props
}: tBtnProps<'link' | 'button'>) => {
	if (as === 'link') {
		const linkProps = props as Props.Link
		return (
			<Link
				{...linkProps}
				href={linkProps.href}
				data-slot='button'
				className={cn(buttonVariants({ variant, size, className }))}>
				<TouchTarget>{props.children}</TouchTarget>
			</Link>
		)
	}
	const Tag = asChild ? Slot : 'button'
	const buttonProps = props as Props<'button'>
	return (
		<Tag
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...buttonProps}>
			<TouchTarget>{props.children}</TouchTarget>
		</Tag>
	)
}

export function TouchTarget({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<span
				className='absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden'
				aria-hidden='true'
			/>
			{children}
		</>
	)
}
