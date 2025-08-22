import { PrideFlag, TransFlag } from '@/(Content)/_Layout/SVG'
import { cn } from '~/cn'

export const IconAttributes = ({
	un,
	pride,
	trans,
}: Record<'un' | 'pride' | 'trans', boolean>) => {
	return (
		<ul
			className={cn(
				'*:border-foreground/50',
				'absolute right-0 bottom-0',
				'flex',
				'items-center justify-between',
				'px-2 *:border-r-1 *:px-2 *:last:border-0'
			)}>
			{un && (
				<li className='text-xs font-bold text-[#498DD5] uppercase'>
					UN
				</li>
			)}
			{pride && (
				<li>
					<PrideFlag />
				</li>
			)}
			{trans && (
				<li>
					<TransFlag />
				</li>
			)}
		</ul>
	)
}
