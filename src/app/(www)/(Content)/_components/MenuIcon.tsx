import { motion } from 'motion/react'
import { Icon } from '~/components/Icon'

const Hamburger = ({ open }: { open: boolean }) => (
	<>
		<motion.path
			id='top'
			layout='size'
			d='M5,8h14c0.55,0,1-0.45,1-1s-0.45-1-1-1H5C4.45,6,4,6.45,4,7S4.45,8,5,8'
			animate={{
				rotate: open ? 45 : 0,
				translateY: open ? '0px' : 0,
				translateX: open ? '2px' : 0,
				transformBox: 'fill-box',
				transformOrigin: 0,
			}}
		/>
		<motion.path
			id='middle'
			d='M5,13h14c0.55,0,1-0.45,1-1s-0.45-1-1-1H5c-0.55,0-1,0.45-1,1S4.45,13,5,13'
			layout='size'
			animate={{
				opacity: open ? '0%' : '100%',
			}}
		/>
		<motion.path
			id='bottom'
			layout='size'
			d='M20,17c0-0.55-0.45-1-1-1H5c-0.55,0-1,0.45-1,1s0.45,1,1,1h14C19.55,18,20,17.55,20,17'
			animate={{
				rotate: open ? -45 : 0,
				translateY: open ? 1 : 0,
				transformBox: 'fill-box',
				transformOrigin: 0,
				translateX: open ? '2px' : 0,
			}}
		/>
	</>
)

export const MenuIcon = ({ open }: { open: boolean }) => {
	return (
		<Icon className='size-10 sm:size-8'>
			<Hamburger open={open} />
		</Icon>
	)
}
