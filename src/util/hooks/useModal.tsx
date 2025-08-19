'use client'

import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '~/cn'
import { Icon, TouchTarget } from '~/components'

/**
 *
 * @param elId - The ID of the element to create a portal into. This element will be created if it does not exist.
 * The portal will be appended to the body of the document.
 *
 * This hook creates a portal that can be used to render modals or other components outside of the normal React tree.
 * It returns an object with a `Portal` component that can be used to render children into the portal.
 *
 * The `Portal` component takes the following props:
 * - `children`: The content to render inside the portal.
 * - `handleClick`: 
 * A function without any parameters to call when the modal background is clicked to close the modal. 
 * If you need the event for other purposes, create a seperate click handler to integrate with the modal's close function in your component.
* **EX**: `onClick={(e) => { handleClick(); doSomethingElse(e); }`

 * - `isOpen`: A boolean indicating whether the modal is open or not
 * @returns
 */
export const usePortal = (elId: string) => {
	const elRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!elRef.current) {
			elRef.current = document.createElement('div')
			elRef.current.setAttribute('id', elId)
		}

		const parentEl = document.body
		parentEl.appendChild(elRef.current)
	}, [elId])

	const Portal = ({
		children,
		handleClick,
		isOpen,
		openFrom = 'right',
	}: {
		children: React.ReactNode
		handleClick: () => void
		isOpen: boolean
		openFrom?: 'top' | 'bottom' | 'left' | 'right'
	}) => {
		return elRef.current ?
				createPortal(
					<>
						<ModalWrapper
							open={isOpen}
							openFrom={openFrom}
							handleClick={handleClick}>
							{children}
						</ModalWrapper>
					</>,
					elRef.current
				)
			:	null
	}

	return { Portal }
}

export const ModalWrapper = ({
	children,
	handleClick,
	open,
	openFrom = 'right',
}: {
	children: React.ReactNode
	open: boolean
	handleClick: () => void
	openFrom?: 'top' | 'bottom' | 'left' | 'right'
}) => {
	const bgRef = useRef<HTMLSpanElement>(null)

	const openDirection = () => {
		switch (openFrom) {
			case 'top':
				return {
					isClosed: { translateY: '0vh' },
					isOpen: { translateY: '0vh' },
					className: '',
				}
			case 'bottom':
				return {
					isClosed: { height: '0%' },
					isOpen: { height: 'auto' },
					className:
						'bottom-0 left-0.5 right-0.5 rounded-t-2xl h-full',
				}
			case 'left':
				return {
					isClosed: { translateX: '-100%' },
					isOpen: { translateX: '0%' },
					className: '',
				}
			case 'right':
			default:
				return {
					isClosed: { translateX: '100%' },
					isOpen: { translateX: '0%' },
					className:
						'left-0 w-3/4 h-[calc(100vh-2rem)] w-3/4 rounded-l-2xl md:w-1/2 my-2 ',
				}
		}
	}

	const { isOpen, isClosed, className } = openDirection()

	return (
		open && (
			<motion.span
				key='portalModal'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className='modal flex justify-end lg:hidden'
				ref={bgRef}
				onClick={(e) => {
					if (e.target == bgRef.current) {
						handleClick()
					}
				}}>
				<motion.span
					initial={isClosed}
					animate={isOpen}
					exit={isClosed}
					transition={{
						bounce: 0,
					}}
					key='innerMenu'
					className={cn(
						'absolute block bg-white shadow-[0_-1px_15px_10px] shadow-black/20',
						className
					)}>
					<div className='relative h-1 w-full'>
						<button
							className={cn(
								'click focus-button absolute',
								openFrom == 'right' && 'top-2 -left-12',
								openFrom == 'left' && 'top-2 -right-12',
								openFrom == 'top' && 'left-1/2 -translate-x-1/2',
								openFrom == 'bottom' && 'right-2 bottom-full',
								'text-white opacity-50 hover:opacity-100'
							)}
							onClick={() => handleClick()}
							autoFocus={true}>
							<TouchTarget>
								<Icon
									IconName='XIcon'
									className='h-10 w-10'
								/>
							</TouchTarget>
						</button>
					</div>
					<div className='p-4'>{children}</div>
				</motion.span>
			</motion.span>
		)
	)
}
