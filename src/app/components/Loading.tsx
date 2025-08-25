'use client';

import { motion } from 'motion/react';
import { Icon } from './Icon';

export const Loading = () => {
	return (
		<motion.div className='relative flex items-center justify-center w-full h-full'>
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
				}}
			>
				<Icon
					IconName='PlaneIcon'
					className='text-accent-300 rotate-z-45 rotate-x-30 drop-shadow-white drop-shadow-md h-10 w-10'
					solid
				/>
			</motion.span>
			<span className='ml-2 text-accent-900 text-4xl font-serif tracking-wider block relative z-2 text-shadow-xs text-shadow-accent-100'>
				Loading
			</span>
		</motion.div>
	);
};
