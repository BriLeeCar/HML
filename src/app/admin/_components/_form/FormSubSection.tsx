import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

const SubSectionFieldset = ({ ...props }: Props<'fieldset'>) => {
	return (
		<fieldset
			{...props}
			className='mx-auto w-full max-w-2xl not-first:mt-4 not-last:mb-2'>
			{props.children}
		</fieldset>
	)
}

const Divider = ({ side }: { side?: 'left' | 'right' }) => (
	<span
		className={cn(
			side == 'left' && 'bg-linear-to-r',
			side == 'right' && 'bg-linear-to-l',
			'to-interactive/25 h-px w-full from-transparent'
		)}
	/>
)

const Legend = ({
	description,
	...props
}: Props<'legend'> & {
	description?: ReactNode
}) => {
	return (
		<legend
			{...props}
			className={cn(
				'relative mb-4 grid w-full grid-cols-[1fr_max-content_1fr] items-center gap-x-2 text-lg whitespace-nowrap',
				props.className
			)}>
			<Divider side='left' />
			{props.children}
			<Divider side='right' />
			{description && (
				<p
					data-slot='description'
					className='subtitle col-span-full row-start-2 text-sm font-light text-wrap italic'>
					{description}
				</p>
			)}
		</legend>
	)
}

const Details = ({ ...props }: Props) => {
	return (
		<div
			{...props}
			className={cn('mx-auto grid w-full gap-y-8', props.className)}
		/>
	)
}

SubSectionFieldset.Legend = Legend
SubSectionFieldset.Details = Details

export { SubSectionFieldset }
