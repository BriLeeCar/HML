import { motion } from 'motion/react'
import { useContext } from 'react'
import { Logo } from './Logo'
import { CurrentPathContext } from './SidebarContext'

export const SidebarHeader = ({ children }: Props) => {
	const { open } = useContext(CurrentPathContext)!
	return (
		<div
			className={
				'border-hml-slate-100/5 flex flex-col border-b py-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5'
			}>
			<motion.span className='px-2'>
				<Logo
					className='h-full w-auto *:[#Text]:hidden'
					viewBox={!open ? '0 0 260.38 260.38' : '0 0 642.77 260.38'}
				/>
			</motion.span>
			{children}
		</div>
	)
}
