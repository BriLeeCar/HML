import Image from 'next/image'

export const Img = () => {
	return (
		<div className='hidden h-full w-full p-3 max-[1200px]:min-w-[25vw] md:flex'>
			<div className='border-foreground/10 relative h-full w-full overflow-hidden'>
				<Image
					src='https://brileec.com/hml/flag.png'
					fill
					style={{
						objectFit: 'cover',
						objectPosition: '30%',
					}}
					alt=''
					sizes='100vh'
					priority
				/>
			</div>
		</div>
	)
}
