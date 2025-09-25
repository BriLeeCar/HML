import Link from 'next/link'
import { cn } from '~/lib/cn'
import { Icon } from './Icon'

export const Bluesky = ({ handle }: { handle: string }) => {
	return (
		<Link
			href={`https://bsky.app/profile/${handle}`}
			className={cn('hover:opacity-50', 'text-[#0385ff]')}
			aria-label={'BlueSky Profile'}
			title={'BlueSky Profile'}
			target='_blank'
			rel='noopener'>
			<Icon
				IconName={'BlueSkyIcon'}
				className='h-4 w-4'
			/>
		</Link>
	)
}
