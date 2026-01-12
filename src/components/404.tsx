'use client'

export const NotFound404 = () => {
	return (
		<div className='relative flex h-screen w-full flex-col items-center justify-center gap-1'>
			<span className='font-playfair block text-9xl font-thin text-shadow-xs'>404</span>
			<span className='font-sans text-2xl font-extralight tracking-tight text-gray-400 uppercase'>
				page not found
			</span>
		</div>
	)
}
