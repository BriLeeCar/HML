import Link from 'next/link'
import { cn } from '~/lib/cn'
import { Icon } from './Icon'

export const Button = ({
	variant = 'default',
	preIcon,
	...props
}: tBtnProps<'link' | 'button'> & {
	preIcon?: Props.Icon['IconName']
}) => {
	const classes = cn(
		'click relative rounded-md px-3.5 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-0 has-[svg]:py-2',
		variant == 'default' && 'bg-brand hover:bg-brand-bright text-white ring-zinc-600',
		variant == 'bright' && 'bg-brand-bright hover:bg-brand text-white ring-zinc-600',
		variant == 'muted'
			&& 'text-brand-bright hover:bg-muted outline-brand-bright ring-zinc-600 outline-1 hover:outline-current/10',
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
				<Inner
					children={props.children}
					preIcon={preIcon}
				/>
			</Link>
		)
	}
	const buttonProps = props as Props<'button'>
	return (
		<button
			{...buttonProps}
			className={classes}>
			<TouchTarget>
				<Inner
					children={props.children}
					preIcon={preIcon}
				/>
			</TouchTarget>
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
} & (T extends 'link' ? Omit<Props.Link, 'as'> & { as: 'link'; href: string }
: T extends 'button' ? Props<'button'>
: never)

const Inner = ({
	preIcon,
	...props
}: {
	preIcon?: Props.Icon['IconName']
	children: React.ReactNode
}) => {
	return (
		<>
			{preIcon && (
				<Icon
					IconName={preIcon}
					className='mr-4 -ml-1 inline h-4 w-4'
				/>
			)}
			{props.children}
		</>
	)
}
