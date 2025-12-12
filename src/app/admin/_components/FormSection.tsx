import { FieldGroup, Text } from '@/admin/_components/catalyst'
import type { ReactNode } from 'react'
import { SubSection } from '~/components/Page'
import { cn } from '~/lib/cn'

export const FormSection = ({
	'aria-label': ariaLabel,
	description,
	...props
}: Props<typeof SubSection> & {
	description: ReactNode
	title: ReactNode
}) => {
	return (
		<SubSection
			{...props}
			aria-label={ariaLabel}
			role='group'
			title={props.title}
			className={cn(
				'focus-visible:outline-interactive/50',
				'from-background dark:text-foreground text-v2-red sticky top-0 z-10 bg-linear-to-b from-50% to-transparent to-100% max-md:pt-4 max-md:pb-8 md:static dark:from-[#181c1d]',
				props.className
			)}
			innerProps={{
				...props.innerProps,
				className: cn('-mt-6 pl-0 md:mt-0 md:pl-6', props.innerProps?.className),
			}}>
			<Text
				data-slot='description'
				className='mb-10 text-balance'>
				{description}
			</Text>
			<FieldGroup>{props.children}</FieldGroup>
		</SubSection>
	)
}
