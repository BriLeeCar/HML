import { JSX } from 'react'
import { cn } from '~/lib/cn'
import { PrideFlag, TransFlag } from '.'

export const IconAttributes = ({
	attr,
	as,
	...props
}: Props & {
	as?: keyof JSX.IntrinsicElements
	attr: ReturnType<ApiData.DB['getCommunityAttributes']>
}) => {
	const Tag = as ?? 'ul'
	const InnerTag = Tag == 'ul' ? 'li' : 'span'
	return (
		<Tag
			className={cn(
				'*:border-foreground/20',
				'flex',
				'items-center justify-between',
				'px-2 *:border-r-1 *:px-2 *:last:border-0',
				props.className
			)}>
			{attr.isUn && (
				<InnerTag className='font-bold text-[#498DD5] uppercase no-underline! decoration-transparent decoration-0!'>
					UN
				</InnerTag>
			)}
			{attr.prideScore && attr.prideScore >= 0 && (
				<InnerTag className='text-current/50'>
					<PrideFlag />
				</InnerTag>
			)}
			{attr.transSafety && (
				<InnerTag className='text-current'>
					<TransFlag />
				</InnerTag>
			)}
		</Tag>
	)
}
