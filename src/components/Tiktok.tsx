import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import Link from 'next/link'

export const Tiktok = ({ handle }: { handle: string }) => {
	return (
		<Link
			href={`https://www.tiktok.com/@${handle}`}
			className={cn('text-foreground hover:opacity-50')}
			aria-label={'TikTok Profile'}
			title={'TikTok Profile'}
			target='_blank'
			rel='noopener'>
			<Icon
				IconName={'TikTokIcon'}
				className='h-4 w-4'
			/>
		</Link>
	)
}
