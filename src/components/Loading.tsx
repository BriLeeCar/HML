'use client'

import { motion } from 'motion/react'
import { Icon } from '~/components/Icon'

export const Loading = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<motion.div
				className='bg-background/10 flex h-12 w-12 items-center justify-center rounded-full'
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
				<Icon
					IconName='PlaneIcon'
					className='text-foreground h-6 w-6'
				/>
			</motion.div>
		</div>
	)
}
