'use client'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/cn'

const BadgeVariants = cva(
	[
		'inline-flex items-center gap-x-1.5 rounded-md border-1 border-current/20 px-2 py-0.5 font-mono text-[0.6rem]/5 font-medium uppercase shadow-2xs saturate-50 hover:saturate-100 forced-colors:outline',
	],
	{
		variants: {
			color: {
				amber:
					'bg-amber-400/20 text-amber-700 group-data-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-hover:bg-amber-400/15',
				blue: 'bg-blue-500/15 text-blue-700 group-data-hover:bg-blue-500/25 dark:text-blue-400 dark:group-data-hover:bg-blue-500/25',
				cyan: 'bg-cyan-400/20 text-cyan-700 group-data-hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-hover:bg-cyan-400/15',
				emerald:
					'bg-emerald-500/15 text-emerald-700 group-data-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-hover:bg-emerald-500/20',
				fuchsia:
					'bg-fuchsia-400/15 text-fuchsia-700 group-data-hover:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-hover:bg-fuchsia-400/20',
				green:
					'bg-green-500/15 text-green-700 group-data-hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-hover:bg-green-500/20',
				indigo:
					'bg-indigo-500/15 text-indigo-700 group-data-hover:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-hover:bg-indigo-500/20',
				lime: 'bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-hover:bg-lime-400/15',
				orange:
					'bg-orange-500/15 text-orange-700 group-data-hover:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-hover:bg-orange-500/20',
				pink: 'bg-pink-400/15 text-pink-700 group-data-hover:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-hover:bg-pink-400/20',
				purple:
					'bg-purple-500/15 text-purple-700 group-data-hover:bg-purple-500/25 dark:text-purple-400 dark:group-data-hover:bg-purple-500/20',
				red: 'bg-red-500/15 text-red-700 group-data-hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-hover:bg-red-500/20',
				rose: 'bg-rose-400/15 text-rose-700 group-data-hover:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-hover:bg-rose-400/20',
				sky: 'bg-sky-500/15 text-sky-700 group-data-hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-hover:bg-sky-500/20',
				teal: 'bg-teal-500/15 text-teal-700 group-data-hover:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-hover:bg-teal-500/20',
				violet:
					'bg-violet-500/15 text-violet-700 group-data-hover:bg-violet-500/25 dark:text-violet-400 dark:group-data-hover:bg-violet-500/20',
				yellow:
					'bg-yellow-400/20 text-yellow-700 group-data-hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-hover:bg-yellow-400/15',
				zinc: 'bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10',
			},
		},
		defaultVariants: {
			color: 'blue',
		},
	}
)
export type tBadgeColors = VariantProps<typeof BadgeVariants>['color']

export const Badge = ({
	color,
	className,
	as = 'span',
	...props
}: Props<'span'>
	& VariantProps<typeof BadgeVariants> & {
		as?: 'button' | 'span' | 'a'
	}) => {
	const classes = cn(
		BadgeVariants({
			color: color || 'blue',
			className: className,
		})
	)

	const Tag = as

	return (
		<Tag
			{...props}
			className={cn(
				'group relative inline-flex rounded-md focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2',
				as == 'button' ? 'click' : 'cursor-default'
			)}
			onMouseEnter={(e) => {
				e.currentTarget.setAttribute('data-hover', '')
			}}
			onMouseLeave={(e) => {
				e.currentTarget.removeAttribute('data-hover')
			}}>
			<span className={classes}>{props.children}</span>
		</Tag>
	)
}
