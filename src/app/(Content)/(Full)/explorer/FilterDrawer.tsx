'use client'

import { motion, type MotionProps } from 'motion/react'
import type { MouseEvent, RefObject } from 'react'
import { Button, Checkbox, Icon, Label, SectionHeading, SubSection } from '~/components'
import { cn } from '~/lib/cn'
import { filterCbs, masonryReducer, type tDrawerFilter, type tReducerDispatch } from '.'

export const Drawer = ({
	overlayRef,
	dispatchReducer,
	reducer,
	...props
}: Props
	& MotionProps & {
		overlayRef: RefObject<HTMLDivElement | null>
		dispatchReducer: tReducerDispatch
		reducer: ReturnType<typeof masonryReducer>
	}) => {
	const motionVariants = {
		hidden: {
			opacity: 0,
			width: reducer.drawer.size == 'md' ? 0 : '100%',
			height: reducer.drawer.size == 'md' ? '100vh' : 0,
		},
		visible: {
			opacity: 1,
			width: reducer.drawer.size == 'md' ? '350px' : '100%',
			height: reducer.drawer.size == 'md' ? '100vh' : '80vh',
		},
	}

	return (
		<motion.div
			{...props}
			ref={overlayRef}
			key='overlay'
			initial={{
				opacity: 0,
			}}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={e => {
				e.target == e.currentTarget
					&& dispatchReducer({
						type: 'SET_DRAWER',
						payload: { size: '' },
					})
			}}
			className='fixed inset-0 z-[999] h-screen w-screen overflow-hidden backdrop-blur-sm md:backdrop-blur-xs'>
			<div
				key='drawer-container'
				className={cn(
					'fixed right-0 bottom-0 left-0',
					'z-[999] h-max w-full',
					'md:top-0 md:right-20 md:h-screen md:w-max',
					'flex items-end'
				)}>
				<motion.div
					key='drawer'
					initial={motionVariants.hidden}
					animate={motionVariants.visible}
					exit={motionVariants.hidden}
					className={cn(
						'bg-background border-muted overflow-x-hidden overflow-y-scroll rounded-t-2xl border-1 border-b-0 md:rounded-none',
						'p-8 shadow-[0_-4px_8px_rgba(0,0,0,0.4)] backdrop-blur-md md:backdrop-blur-xs'
					)}>
					<FilterHeading />

					<form className='mt-4 flex flex-col gap-2 pointer-coarse:mb-12'>
						{filterCbs.map(grp => (
							<SubSection
								wrapperProps={{
									className: 'flex flex-col gap-1 *:[div]:flex *:[div]:flex-col *:[div]:gap-2',
								}}
								title={grp.group}
								key={grp.group}>
								{grp.items.map(cb => (
									<FilterCB
										key={cb.dataKey}
										dataKey={cb.dataKey}
										label={cb.label}
										reducer={reducer}
										matches={cb.matches}
										dispatchReducer={dispatchReducer}
									/>
								))}
							</SubSection>
						))}
						<ClearButton dispatchReducer={dispatchReducer} />
						<CloseButton dispatchReducer={dispatchReducer} />
					</form>
				</motion.div>
			</div>
		</motion.div>
	)
}

const FilterHeading = () => (
	<SectionHeading
		eyebrow='Filter'
		subtitle={
			<span className='pointer-coarse:hidden'>
				We can help narrow down the selection if you tell us a little bit about yourself - don’t
				worry, we don’t keep a record of any of this and none of it can be traced back to you! If
				you don’t select anything, you will just be shown the full list of pathways
			</span>
		}>
		Let's get you matched!
	</SectionHeading>
)

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
		dispatchReducer: tReducerDispatch
	}) => {
	return (
		<Label className='flex items-start gap-3 text-sm font-semibold sm:text-base'>
			<Checkbox
				{...props}
				id={dataKey}
				name={dataKey}
				defaultChecked={reducer.filters.map(f => f.key).includes(dataKey)}
				onCheckedChange={checked =>
					dispatchReducer({
						type: 'SET_FILTERS',
						payload: {
							key: dataKey,
							value: checked == true,
							matches: matches,
						},
					})
				}
				className='mt-0.5 pointer-coarse:mt-1'
			/>
			{label}
		</Label>
	)
}
const CloseButton = ({ dispatchReducer }: { dispatchReducer: tReducerDispatch }) => (
	<Button
		variant='muted'
		className='mt-4 flex items-center justify-center gap-2'
		onClick={() => {
			dispatchReducer({ type: 'SET_DRAWER', payload: { size: '' } })
		}}>
		<Icon
			IconName='XIcon'
			className='size-4'
		/>
		Close Filters
	</Button>
)
const ClearButton = ({ dispatchReducer }: { dispatchReducer: tReducerDispatch }) => (
	<Button
		variant='default'
		className='mt-4 flex items-center justify-center gap-2'
		onClick={(e: MouseEvent<HTMLButtonElement>) => {
			handleClear(e, dispatchReducer)
		}}>
		<Icon
			solid
			IconName='TrashXIcon'
			className='size-4'
		/>
		Clear all filters
	</Button>
)
const handleClear = (e: MouseEvent<HTMLButtonElement>, dispatchReducer: tReducerDispatch) => {
	if (e.currentTarget.form) {
		const checkBoxes = e.currentTarget.form.querySelectorAll('input[type="checkbox"]')
		checkBoxes.forEach(checkbox => {
			;(checkbox as HTMLInputElement).checked = false
		})
	}
	dispatchReducer({ type: 'CLEAR_FILTERS' })
	dispatchReducer({ type: 'SET_DRAWER', payload: { size: '' } })
}
