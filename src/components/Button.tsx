import Link from 'next/link'
import { cn } from '~/lib/cn'

export const Button = ({
	variant = 'default',
	...props
}: tBtnProps<'link' | 'button'>) => {
	// const Tag = 'href' in props ? Link : 'button'
	const classes = cn(
		'click relative rounded-md px-3.5 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase transition-all focus-visible:outline-2 focus-visible:outline-offset-2 has-[svg]:py-2',
		variant == 'default'
			&& 'bg-brand hover:bg-brand-bright text-white focus-visible:outline-zinc-600',
		variant == 'bright'
			&& 'bg-brand-bright hover:bg-brand text-white focus-visible:outline-zinc-600',
		variant == 'muted'
			&& 'text-brand-bright hover:bg-muted outline-brand-bright outline-1 hover:outline-current/10 focus-visible:outline-zinc-600',
		variant == 'ghost' && 'border-0 bg-transparent text-current',
		props.className
	)
	if ('href' in props) {
		const linkProps = props as Props.Link
		return (
			<Link
				prefetch={false}
				{...linkProps}
				href={linkProps.href}
				className={classes}>
				{props.children}
			</Link>
		)
	}
	const buttonProps = props as Props<'button'>
	return (
		<button
			{...buttonProps}
			className={classes}>
			<TouchTarget>{props.children}</TouchTarget>
		</button>
	)
}

export function TouchTarget({
	children,
	...props
}: {
	children: React.ReactNode
} & Props) {
	return (
		<>
			<span
				className={cn(
					'absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden',
					props.className
				)}
				aria-hidden='true'
			/>
			{children}
		</>
	)
}

type tBtnProps<T extends 'button' | 'link'> = {
	variant?: 'default' | 'muted' | 'ghost' | 'bright'
} & (T extends 'link' ?
	Omit<Props.Link, 'as'> & { as: 'link'; href: string }
: T extends 'button' ? Props<'button'>
: never)
