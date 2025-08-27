'use client';

export const NotFound404 = () => {
	return (
		<div className='relative flex flex-col gap-1 items-center justify-center w-full h-screen'>
			<span className='text-accent-900 text-9xl font-playfair font-thin block text-shadow-xs text-shadow-accent-100 '>
				404
			</span>
			<span className='text-2xl font-extralight tracking-tight font-sans uppercase text-gray-400'>
				page not found
			</span>
		</div>
	);
};
