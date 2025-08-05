'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon, TouchTarget } from '~/components';

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
	const elRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!elRef.current) {
			elRef.current = document.createElement('div');
			elRef.current.setAttribute('id', elId);
		}

		const parentEl = document.body;
		parentEl.appendChild(elRef.current);

		return () => {
			if (elRef.current && parentEl.contains(elRef.current)) {
				parentEl.removeChild(elRef.current);
			}
		};
	}, [elId]);

	const Portal = ({
		children,
		handleClick,
		isOpen,
	}: {
		children: React.ReactNode;
		handleClick: () => void;
		isOpen: boolean;
	}) => {
		return elRef.current
			? createPortal(
					<ModalWrapper isOpen={isOpen} handleClick={handleClick}>
						{children}
					</ModalWrapper>,
					elRef.current,
				)
			: null;
	};

	return { Portal };
};

const ModalWrapper = ({
	children,
	handleClick,
	isOpen,
}: {
	children: React.ReactNode;
	isOpen: boolean;
	handleClick: () => void;
}) => {
	const bgRef = useRef<HTMLSpanElement>(null);

	return (
		<AnimatePresence>
			<>
				{isOpen && (
					<motion.span
						key='portalModal'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='lg:hidden modal flex justify-end'
						ref={bgRef}
						onClick={(e) => {
							if (e.target === bgRef.current) {
								handleClick();
							}
						}}
					>
						<motion.span
							initial={{ translateX: '100%' }}
							animate={{ translateX: '0%' }}
							exit={{ translateX: '100%' }}
							transition={{
								bounce: 0,
							}}
							key='innerMenu'
							className='block bg-white rounded-l-2xl my-2 shadow-lg relative h-[calc(100vh-2rem)] w-3/4 md:w-1/2 left-0'
						>
							<button
								className='absolute top-2 -left-12 text-white opacity-50 hover:opacity-100 click focus-button'
								onClick={() => handleClick()}
								autoFocus={true}
							>
								<TouchTarget>
									<Icon IconName='XIcon' className='h-10 w-10' />
								</TouchTarget>
							</button>
							<div className='p-4'>{children}</div>
						</motion.span>
					</motion.span>
				)}
			</>
		</AnimatePresence>
	);
};
