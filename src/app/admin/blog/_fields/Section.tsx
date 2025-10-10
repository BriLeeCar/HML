'use client'
import { type ComponentPropsWithoutRef, useState } from 'react'
import { Icon, P } from '~/components'
import { cn } from '~/lib/cn'

export const Section = ({
	sectionTitle,
	sectionDescription,
	...props
}: {
	sectionTitle: string
	sectionDescription: string
} & ComponentPropsWithoutRef<'div'>) => {
	const [open, setOpen] = useState(true)

	const toggleOpen = () => {
		setOpen(!open)
	}

	return (
		<div {...props}>
			<span
				onClick={toggleOpen}
				className='cursor-pointer'>
				<Icon
					IconName='ChevronRightIcon'
					className={cn(
						open ? 'rotate-90' : '',
						'mr-2 inline-block h-4 w-4 transition-transform'
					)}
				/>
				{sectionTitle}
			</span>
			<P>{sectionDescription}</P>
			<section className={open ? 'block' : 'hidden'}>
				{props.children}
			</section>
		</div>
	)
}
