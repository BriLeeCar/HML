'use client'

import { redirect, RedirectType } from 'next/navigation'
import { cn } from '~/cn'
import { Icon } from '~/components'
import { Button } from '~/components/ui'

export const NowBtn = ({
	...props
}: Props<'button'> & {
	mainTxt?: string
	subTxt?: string
}) => {
	return (
		<Button
			variant={'primary'}
			size={'sm'}
			{...props}
			className={cn(
				'click mb-4 h-auto w-full flex-col items-center justify-center gap-0 py-2 whitespace-normal sm:flex-row sm:gap-1.25 md:justify-around md:gap-2',
				props.className || ''
			)}>
			<span className='text-xl font-black uppercase sm:text-5xl'>
				<span className='sm:hidden'>Help Me Leave </span>NOW
			</span>
			<span className='text-sm uppercase md:w-1/2 md:text-end md:text-base/4 lg:w-full'>
				I Desperate Need to Seek Safety
			</span>
		</Button>
	)
}

export const SmallBtns = () => {
	const btns = [
		{
			main: 'SOON',
			sub: 'I Need to Leave in 2-6 Months',
			onClick: undefined,
		},
		{
			main: 'EXPLORE',
			sub: "I'm Curious About My Options",
			onClick: undefined,
		},
	]

	return (
		<span className='grid w-full grid-cols-1 gap-4 lg:grid-cols-2'>
			{btns.map((btn, i) => {
				return (
					<Button
						size={'lg'}
						variant={'secondary'}
						key={i}
						className='w-full grow flex-col gap-0 px-4 py-2 tracking-tighter'
						onClick={btn.onClick}>
						<span className='text-lg sm:text-2xl'>
							Help Me {btn.main == 'SOON' && 'LEAVE '}
							<b className='font-extrabold'>{btn.main}</b>
						</span>
						<span className='text-xs tracking-tight whitespace-normal uppercase sm:text-sm'>
							{btn.sub}
						</span>
					</Button>
				)
			})}
		</span>
	)
}

export const MapBtn = () => {
	const handleClick = () => {
		redirect('/map', 'push' as RedirectType)
	}
	return (
		<>
			<Button
				onClick={handleClick}
				variant={'outline'}
				size={'lg'}
				className='text-primary-foreground fixed right-10 hidden items-center rounded-lg text-2xl font-extrabold min-[1200px]:flex'>
				Explore the Map{' '}
				<Icon
					IconName='ChevronRightIcon'
					className='size-18 animate-pulse'
				/>
			</Button>
			<span className='w-full p-6 pr-0 text-end transition-all min-[1200px]:hidden'>
				<Button
					onClick={handleClick}
					variant={'outline'}
					className='bg-ring/20 hover:bg-ring/30 w-auto min-w-max rounded-r-none py-0 pr-0 text-base font-bold tracking-wide italic shadow-sm'>
					<Icon
						IconName='GlobeIcon'
						className={cn(
							'mr-auto size-4 in-[button:hover]:animate-spin'
						)}
					/>
					resource map
				</Button>
			</span>
		</>
	)
}
