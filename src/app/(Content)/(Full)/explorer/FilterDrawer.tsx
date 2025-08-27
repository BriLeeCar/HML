'use client'

import { Button, Heading, Icon, Label, P } from '@/_Components'
import { motion, MotionProps } from 'motion/react'
import { ActionDispatch, RefObject, useEffect, useState } from 'react'
import { Checkbox } from '~/components/ui/Checkbox'
import { cn } from '~/lib/cn'
import { masonryReducer } from './reducer'
import {
	filterCbs,
	tDrawerAction,
	tDrawerFilter,
	tFilterAction,
	tSetCountriesAction,
} from './util'

export const Drawer = ({
	overlayRef,
	dispatchReducer,
	reducer,
	...props
}: Props
	& MotionProps & {
		overlayRef: RefObject<HTMLDivElement | null>
		dispatchReducer: ActionDispatch<
			[action: tDrawerAction | tFilterAction | tSetCountriesAction]
		>
		reducer: ReturnType<typeof masonryReducer>
	}) => {
	const [screenSize, setScreenSize] = useState(0)

	useEffect(() => {
		const updateSize = () =>
			setScreenSize(globalThis.window.innerWidth)
		globalThis.window.addEventListener('resize', updateSize)
		updateSize()
		return () =>
			globalThis.window.removeEventListener('resize', updateSize)
	})

	const motionProps = () => {
		if (screenSize >= 768) {
			return {
				animate: {
					width: reducer.drawerOpen ? '350px' : '0px',
					height: '100vh',
				},
				exit: { width: 0 },
			}
		} else {
			return {
				animate: {
					width: '100%',
					height: reducer.drawerOpen ? '50vh' : '0%',
				},
				exit: { height: 0 },
			}
		}
	}

	return (
		<motion.div
			{...props}
			ref={overlayRef}
			key='overlay'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={(e) =>
				e.target == overlayRef.current
				&& dispatchReducer({ type: 'SET_DRAWER' })
			}
			className='fixed inset-0 z-[999] h-screen w-screen overflow-hidden bg-black/30 backdrop-blur-sm md:backdrop-blur-xs'>
			<div
				key='drawer-container'
				className={cn(
					'fixed right-0 bottom-0 left-0',
					'z-[999] h-full w-screen',
					'md:top-0 md:right-20 md:h-screen md:w-max',
					'flex items-end'
				)}>
				<motion.div
					key='drawer'
					initial={{ ...motionProps().exit, opacity: 0 }}
					animate={{
						...motionProps().animate,
						opacity: 1,
					}}
					exit={{
						...motionProps().exit,
						opacity: 0,
					}}
					transition={{
						type: 'spring',
					}}
					className={cn(
						'bg-card border-muted w-full overflow-scroll rounded-t-2xl border-1 border-b-0 md:rounded-none',
						'p-8 shadow-[0_-4px_8px_rgba(0,0,0,0.4)] backdrop-blur-md md:backdrop-blur-xs'
					)}>
					<Heading size='lg'>Filter</Heading>
					<P>
						We can help narrow down the selection if you tell us a
						little bit about yourself - don’t worry, we don’t keep a
						record of any of this and none of it can be traced back to
						you! If you don’t select anything, you will just be shown
						the full list of pathways
					</P>
					<form className='mt-4 flex flex-col gap-2 overflow-scroll'>
						{filterCbs.map((grp) => (
							<section key={grp.group}>
								<h3 className='text-muted-foreground mt-4 mb-2 text-lg font-bold'>
									{grp.group}
								</h3>
								<section className='ml-4 flex flex-col gap-0.5 py-3 pl-2'>
									{grp.items.map((cb) => (
										<FilterCB
											key={cb.dataKey}
											dataKey={cb.dataKey}
											label={cb.label}
											reducer={reducer}
											matches={cb.matches}
											dispatchReducer={dispatchReducer}
										/>
									))}
								</section>
							</section>
						))}
					</form>
				</motion.div>
				<Button
					onClick={() => dispatchReducer({ type: 'SET_DRAWER' })}
					variant={'link'}
					className='text-background click absolute top-4 -right-8 hover:-right-12 hover:scale-155'>
					<Icon IconName='XIcon' />
				</Button>
			</div>
		</motion.div>
	)
}

const FilterCB = ({
	label,
	dataKey,
	reducer,
	matches,
	dispatchReducer,
	...props
}: Props<typeof Checkbox>
	& tDrawerFilter & {
		reducer: ReturnType<typeof masonryReducer>
		dispatchReducer: ActionDispatch<
			[action: tDrawerAction | tFilterAction | tSetCountriesAction]
		>
	}) => {
	return (
		<Label className='flex items-center gap-2 text-sm font-semibold'>
			<Checkbox
				{...props}
				id={dataKey}
				name={dataKey}
				defaultChecked={reducer.filters.includes(dataKey)}
				onCheckedChange={(checked) =>
					dispatchReducer({
						type: 'SET_FILTERS',
						payload: {
							key: dataKey,
							value: checked == true,
							matches: matches,
						},
					})
				}
			/>
			{label}
		</Label>
	)
}
