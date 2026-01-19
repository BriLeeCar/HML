'use client'

import { motion } from 'motion/react'

export const BottomPlane = ({ ...props }: Props<'svg'>) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 259.96 167.89'>
			<path
				fill='none'
				strokeDasharray='3.9 3.9'
				strokeMiterlimit='10'
				strokeWidth='1.65px'
				stroke='currentColor'
				className='text-hml-red'
				d='M49.31,97.59C136.59-73.46,214.43,42.93,259.42,3.15'
			/>
			<motion.path
				initial={{ translateY: -60, translateX: 20 }}
				animate={{
					translateY: [-60, 0],
					translateX: [20, 0],
				}}
				transition={{ duration: 1 }}
				fill='currentColor'
				d='M3.63,90.56l-3.63,7.64,20.18,40.8-7.66,16.14c-1.01,2.14-1.14,4.6-.34,6.82.8,2.22,2.44,4.05,4.59,5.06,2.14,1.01,4.6,1.14,6.82.34s4.05-2.44,5.06-4.59l7.87-16.56,44.38-10.16,3.43-7.23-37.66-3.98,8.81-18.57,15.94-2.33,3.83-8.07-24-1.5-16.34-17.65-3.83,8.07,8.27,13.81-8.97,18.9L3.64,90.51l-.02.04h0Z'
				className={'text-hml-red rotate-5'}
			/>
		</svg>
	)
}
