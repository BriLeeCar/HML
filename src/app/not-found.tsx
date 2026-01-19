import { NotFound404 } from '~/components'
import { cn } from '~/lib/cn'
import '~/style/www.css'

const NotFound = () => {
	return (
		<body
			className={cn(
				'text-foreground relative h-screen overflow-x-hidden antialiased has-[#homepage]:overflow-hidden has-[main#homepage]:pb-0!'
			)}>
			<main>
				<div className='relative flex h-screen w-full flex-col items-center justify-center gap-1'>
					<span className='block text-9xl font-thin text-shadow-xs'>404</span>
					<span className='text-2xl font-extralight tracking-tight text-gray-400 uppercase'>
						page not found
					</span>
					<NotFound404 />
				</div>
			</main>
		</body>
	)
}

export default NotFound
