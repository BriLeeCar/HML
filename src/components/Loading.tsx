'use client'

import { motion } from 'motion/react'
import { Icon } from '.'

export const Loading = () => {
	return (
		<motion.div className='relative flex h-full w-full items-center justify-center'>
			<motion.span
				initial={{
					top: '50%',
					right: '50%',
				}}
				className='absolute'
				animate={{
					opacity: [1, 1, 1],
					top: ['50%', '-10%', '110%', '110%', '50%'],
					right: ['50%', '-10%', '-10%', '100%', '50%'],
				}}
				transition={{
					duration: 5,
					ease: 'easeInOut',
					times: [0, 0.5, 0.56, 0.57, 1],
					repeat: Infinity,
				}}>
				<Icon
					IconName='PlaneIcon'
					className='text-accent-300 h-10 w-10 rotate-x-30 rotate-z-45 drop-shadow-md drop-shadow-white'
					solid
				/>
			</motion.span>
			<span className='text-accent-900 text-shadow-accent-100 relative z-2 ml-2 block font-serif text-4xl tracking-wider text-shadow-xs'>
				Loading
			</span>
		</motion.div>
	)
}
