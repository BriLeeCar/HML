'use client'

import { MapPathEl, MapSvg } from '@/(Content)/(Full)/map/Map'
import { useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { useContext, useRef } from 'react'
import { cn } from '~/lib/cn'
import { DBContext } from '~/server/db/provider'
import { MapBtn, NowBtn, SmallBtns } from './Buttons'
import { HeadingText, TopText } from './HeadingText'
import { BottomPlane } from './MobileText'
import { Img } from './SidebarImg'

const MenuLink = ({ ...props }: Props<typeof Link>) => {
	return (
		<Link
			{...props}
			className='text-foreground w-full text-end text-[1.75rem] font-extrabold underline decoration-red-700 decoration-2'
		/>
	)
}

const MenuWrapper = ({ ...props }) => {
	return (
		<div
			{...props}
			className='flex flex-col items-center justify-center self-stretch border-black/20 pb-6 tracking-tight not-last:border-b-2'
		/>
	)
}

const MenuSub = ({ ...props }) => (
	<div
		{...props}
		className='flex flex-col items-end justify-center gap-2.5 self-stretch text-end leading-tight tracking-wide text-zinc-600 dark:text-zinc-400'
	/>
)

const Home = () => {
	const db = useContext(DBContext)
	return (
		<>
			<Img />
			<div
				className={cn(
					'relative z-10 hidden h-screen',
					'items-around flex-col justify-between pt-28 pl-0 md:flex',
					'max-w-[70vw] items-center justify-center gap-6 py-3',
					'flex-col self-stretch'
				)}>
				<HeadingText />
				<div className='flex flex-col items-center justify-start self-stretch px-3 pt-12 text-white italic'>
					<NowBtn />
					<SmallBtns />
				</div>
				<MapBtn />
			</div>
			<MobileHome />

			<div className='absolute -top-10 -right-40 hidden h-1/2 w-[50vw] -rotate-5 overflow-clip min-[600px]:h-screen min-[1200px]:translate-y-0 min-[1200px]:rotate-0 md:block'>
				<MapSvg className='lg:max-h-fill xl: h-auto w-screen fill-neutral-900/10 stroke-zinc-500 shadow-none lg:relative lg:w-screen'>
					{db.getMapPaths().map((country) => {
						const { svgPath, tier, abbr, name } = country

						return (
							<MapPathEl
								key={name}
								name={name as string}
								abbr={abbr}
								tier={tier}
								svgPath={svgPath || ''}
							/>
						)
					})}
				</MapSvg>
			</div>
		</>
	)
}

export default Home

const Page2 = () => {
	return (
		<>
			<h2 className='flex grow flex-col'>
				<span className='bg-brand-bright flex h-10 max-h-[20vh] grow items-end pl-8 text-3xl font-bold tracking-tight text-white dark:bg-red-700'>
					HELP ME LEAVE
				</span>
				<Link
					href='/leave-now'
					className='text-brand-bright decoration-brand pl-8 text-8xl/18 font-extrabold tracking-tight underline decoration-4 underline-offset-4'>
					NOW
				</Link>
			</h2>
			<div className='flex flex-col items-center justify-between gap-4 self-stretch px-4 py-3'>
				<MenuWrapper>
					<MenuLink href='/explorer'>Visa Explorer</MenuLink>
					<MenuSub>
						Hand picked and heavily researched options to get you to
						safety the fastest
					</MenuSub>
				</MenuWrapper>
				<MenuWrapper>
					<MenuLink href='/guides-resources'>
						Guides & Resources
					</MenuLink>
					<MenuSub>
						<span>
							Whether you’re getting your passport or wanting to
							prepare for your first month in your new home,{' '}
							<em className='inline'>
								we want to make sure you’re prepared.
							</em>
						</span>
					</MenuSub>
				</MenuWrapper>
				<MenuWrapper>
					<MenuLink href='/map'>Interactive Map</MenuLink>
					<MenuSub>
						Hand picked and heavily researched options to get you to
						safety the fastest
					</MenuSub>
				</MenuWrapper>
				<MenuWrapper>
					<MenuLink href='/support'>Find Support</MenuLink>
					<MenuSub>
						<p>
							The{' '}
							<strong className='font-extrabold'>
								Help Me Leave
							</strong>{' '}
							team has volunteers ready to help guide you through this
							process.
						</p>
						<small className='text-sm italic'>
							Services limited to the most at risk groups.
						</small>
					</MenuSub>
				</MenuWrapper>
			</div>
		</>
	)
}

const MobileHome = () => {
	const scrollProgress = useScroll()
	const bottomRef = useRef<HTMLDivElement>(null)

	useMotionValueEvent(scrollProgress.scrollY, 'change', (latest) => {
		const previous = scrollProgress.scrollY.getPrevious()
		if (window.innerWidth > 600 || window.innerHeight < 500) return
		if (previous != undefined) {
			const direction = latest > previous ? 'down' : 'up'

			if (
				direction == 'down'
				&& latest > window.innerHeight / 4
				&& latest < window.innerHeight
			) {
				scrollTo({
					top: bottomRef.current?.offsetTop,
					behavior: 'smooth',
				})
			}
		}
	})
	return (
		<>
			<div
				className={cn(
					'relative z-10 h-screen md:hidden',
					'items-around flex flex-col justify-between pt-28 pl-0',
					'inline-flex flex-col self-stretch'
				)}>
				<hgroup className='pl-4'>
					<TopText className='dark:text-brand-bright text-red-500' />
					<h1 className='sr-only'>Help Me Leave</h1>

					<span className='-mt-6 block px-4 text-xl leading-[1.25lh] font-medium text-black italic dark:text-white dark:text-shadow-xs'>
						A resource hub for at-risk Americans seeking safety abroad
					</span>
				</hgroup>
				<span className='to-background/50 h-fill w-full bg-gradient-to-b from-transparent from-50% to-50%'>
					<BottomPlane className='text-red-500 dark:text-red-700' />
				</span>
			</div>
			<div
				ref={bottomRef}
				className={cn(
					'relative z-10 h-screen',
					'items-around flex flex-col pl-0',
					'bg-background inline-flex flex-col justify-between self-stretch',
					'md:hidden'
				)}>
				<Page2 />
			</div>
		</>
	)
}
