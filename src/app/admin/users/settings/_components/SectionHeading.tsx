import { useState } from 'react'
import { Icon, Section, SectionHeading } from '~/components/index'
import { cn } from '~/lib/cn'

export const ThisSection = ({
	label,
	...props
}: Props<typeof Section> & {
	label: string
}) => {
	const [open, setOpen] = useState(false)
	return (
		<Section className={props.className}>
			<SectionHeading
				onClick={() => setOpen(open == true ? false : true)}
				className={cn(
					'click flex items-center gap-x-6',
					'justify-between sm:justify-start',
					'bg-interactive/10 mx-0 px-0'
				)}>
				<Icon
					IconName='ChevronRightIcon'
					className={cn(open ? 'rotate-90' : '', 'hidden transition-all sm:block')}
				/>
				{label}
				<Icon
					IconName='ChevronRightIcon'
					className={cn(open ? 'rotate-90' : '', 'block transition-all sm:hidden')}
				/>
			</SectionHeading>
			{open && props.children}
		</Section>
	)
}
