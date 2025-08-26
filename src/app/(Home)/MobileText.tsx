'use client'

import { motion } from 'motion/react'

export const BottomPlane = ({ ...props }: Props<'svg'>) => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 375 221.96'>
			<motion.path
				initial={{ translateY: -60 }}
				animate={{ translateY: [-60, 10, 0] }}
				transition={{ duration: 5, ease: 'anticipate' }}
				fill='currentColor'
				d='M142.8,152.74l.12,8.46,36.12,27.7.25,17.87c.04,2.37,1.01,4.63,2.71,6.27,1.7,1.64,3.98,2.56,6.35,2.52,2.37-.04,4.63-1.01,6.27-2.71s2.56-3.98,2.52-6.35l-.25-18.33,35.33-28.71-.11-8-35.55,13.05-.29-20.55,13.27-9.13-.12-8.93-22.2,9.25-22.45-8.62.12,8.93,13.52,8.74.29,20.92-35.91-12.43v.04Z'
				className={
					'[filter:drop-shadow(4px_2px_1.5px_hsl(0_0_0_/_0.15))]'
				}
			/>
			<path
				fill='none'
				strokeDasharray='3.9 3.9'
				strokeMiterlimit='10'
				strokeWidth='1.65px'
				stroke='currentColor'
				d='M187.21,135.16c-17.45-195.94,142.8-54.36,187.79-94.14'
			/>
		</svg>
	)
}
