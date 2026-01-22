'use client'
import { cn } from '~/lib/cn'

export function SidebarSection({
	className,
	heading,
	...props
}: Props<'div'> & {
	heading?: string
}) {
	return (
		<div
			{...props}
			data-slot='section'
			className={cn(className, 'flex flex-col gap-0.5')}>
			{heading && <Heading>{heading}</Heading>}
			{props.children}
		</div>
	)
}

const Heading = ({ className, ...props }: Props<'h3'>) => {
	return (
		<h3
			{...props}
			className={cn(
				className,
				'text-hml-yellow mb-1 px-2 pl-4 text-xs/6 font-normal italic not-in-data-[open=true]:hidden'
			)}
		/>
	)
}
