import Image from 'next/image'
import { cn } from '~/lib/cn'

const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<main
			id='homePage'
			className={cn(
				'relative',
				'grid-cols-[1fr_1fr] md:grid',
				'flex flex-col',
				'min-[1200px]:static min-[1200px]:w-[75vw]',
				'min-h-screen w-screen overflow-x-hidden'
			)}>
			<Image
				src='/flag.png'
				alt=''
				fill
				style={{ objectFit: 'cover', objectPosition: '30%' }}
				sizes='100vh'
				priority
				className='z-1 max-h-screen opacity-15 select-none md:hidden dark:opacity-10'
			/>
			{children}
		</main>
	)
}

export default Layout
