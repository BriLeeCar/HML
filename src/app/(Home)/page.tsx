'use client'

import { MapPathEl, MapSvg } from '@/(Content)/(Full)/map/Map'
import { useContext } from 'react'
import { Button } from '~/components/Button'
import { cn } from '~/lib/cn'
import { DBContext } from '~/server/db/provider'
import { MapBtn, NowBtn, SmallBtns } from './Buttons'
import { HeadingText, TopText } from './HeadingText'
import { BottomPlane } from './MobileText'
import { Img } from './SidebarImg'

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

			<div
				className={cn(
					'absolute -top-10 -right-40 -rotate-5 min-[1200px]:rotate-y-180',
					'min-[1200px]:translate-x-3/4 min-[1200px]:translate-y-0 min-[1200px]:rotate-0 min-[1200px]:overflow-visible',
					'hidden h-1/2 w-[50vw] overflow-clip min-[600px]:h-screen md:block'
				)}>
				<MapSvg className='lg:max-h-fill xl: stroke-background fill-muted h-auto w-screen stroke-1 shadow-none select-none lg:relative lg:w-screen'>
					{db.getMapPaths().map((country) => {
						const { svgPath, tier, abbr, name } = country

						return (
							<MapPathEl
								key={name}
								name={name as string}
								abbr={abbr}
								tier={tier}
								svgPath={svgPath || ''}
								canClick={false}
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
			<h2 className='flex flex-col px-2 pb-6'>
				<Button
					variant='ghost'
					href='/leave-now'
					className='text-brand-bright flex grow justify-center font-serif text-8xl tracking-tight italic'>
					NOW
				</Button>
			</h2>
		</>
	)
}

const MobileHome = () => {
	return (
		<>
			<div
				id='mobile-hero'
				className={cn(
					'relative z-10 h-screen max-h-screen overflow-hidden md:hidden',
					'items-around flex flex-col justify-between pt-16 pl-0',
					'inline-flex flex-col self-stretch'
				)}>
				<hgroup className='pl-4'>
					<TopText className='text-brand-bright' />
					<h1 className='sr-only'>Help Me Leave</h1>

					<span className='-mt-6 block px-4 text-xl leading-[1.25lh] font-medium text-black italic dark:text-white dark:text-shadow-xs'>
						A resource hub for at-risk Americans seeking safety abroad
					</span>
				</hgroup>
				<BottomPlane className='grow' />
				<Page2 />
				{/* <span className='to-background/50 h-fill w-full bg-gradient-to-b from-transparent from-50% to-50%'>
					{/* 
				</span> */}
			</div>
			{/* <div
				ref={bottomRef}
				className={cn(
					'relative z-10',
					'items-around flex flex-col pl-0',
					'bg-background inline-flex flex-col justify-between self-stretch',
					'md:hidden'
				)}></div> */}
		</>
	)
}
