import { useState } from 'react'

export const HeadlessCB = () => {
	const [hovered, setHovered] = useState(false)

	return (
		<span
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			data-hovered={hovered ? true : undefined}
			className='group-data-focus:outline-interactive relative isolate flex size-4.5 items-center justify-center rounded-[0.3125rem] border border-zinc-950/15 [--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-interactive)] [--checkbox-checked-border:var(--color-interactive)]/80 group-data-checked:border-transparent group-data-checked:bg-(--checkbox-checked-border) group-data-disabled:border-zinc-950/25 group-data-disabled:bg-zinc-950/5 group-data-disabled:opacity-50 group-data-disabled:[--checkbox-check:var(--color-interactive)]/50 group-data-focus:outline-2 group-data-focus:outline-offset-2 group-data-hover:group-data-checked:border-transparent before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow-sm group-data-checked:before:bg-(--checkbox-checked-bg) group-data-disabled:before:bg-transparent after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)] data-hover:border-zinc-950/30 sm:size-4 dark:border-white/15 dark:bg-white/5 dark:[--checkbox-check:var(--color-zinc-900)] dark:[--checkbox-checked-bg:var(--color-interactive)] dark:[--checkbox-checked-border:#5A5F0C]/80 dark:group-data-checked:border-white/5 dark:group-data-checked:bg-(--checkbox-checked-bg) dark:group-data-disabled:border-white/20 dark:group-data-disabled:bg-white/2.5 dark:group-data-disabled:[--checkbox-check:var(--color-white)]/50 dark:group-data-hover:border-white/30 dark:group-data-hover:group-data-checked:border-white/5 dark:before:hidden dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.3125rem] dark:group-data-checked:after:block dark:group-data-checked:group-data-disabled:after:hidden forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-data-disabled:[--checkbox-check:Highlight] dark:forced-colors:[--checkbox-check:HighlightText] dark:forced-colors:[--checkbox-checked-bg:Highlight] dark:forced-colors:group-data-disabled:[--checkbox-check:Highlight]'>
			<svg
				className='size-4 stroke-(--checkbox-check) opacity-0 group-data-checked:opacity-100 sm:h-3.5 sm:w-3.5'
				viewBox='0 0 14 14'
				fill='none'>
				<path
					className='opacity-100 group-data-indeterminate:opacity-0'
					d='M3 8L6 11L11 3.5'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'></path>
				<path
					className='opacity-0 group-data-indeterminate:opacity-100'
					d='M3 7H11'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'></path>
			</svg>
		</span>
	)
}
