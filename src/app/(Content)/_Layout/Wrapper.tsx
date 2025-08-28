import { cn } from '~/lib/cn'
import { NavMenu } from './TopNav'

export const Wrapper = ({
	children,
	withNav = true,
	withFooter = true,
	full = false,
}: {
	children: React.ReactNode
	withNav: boolean
	withFooter: boolean
	full: boolean
}) => {
	return (
		<>
			{withNav && (
				<header className='sticky top-0 z-99 w-full backdrop-blur-sm'>
					<NavMenu />
				</header>
			)}
			<Main full={full}>{children}</Main>
			{withFooter && (
				<footer className='absolute bottom-2 w-full p-2 text-center'>
					<small className='text-xs italic'>
						&copy; HelpMeLeave {new Date().getFullYear()}
					</small>
				</footer>
			)}
		</>
	)
}

export const Main = ({
	full,
	children,
	...props
}: Props & { full?: boolean }) => (
	<main
		{...props}
		className={cn(
			'h-fill mx-auto mt-8 mb-8 flex flex-col justify-center',
			!full && 'px-2 sm:px-6 md:max-w-3xl lg:max-w-5xl lg:px-8',
			props.className
		)}>
		{children}
	</main>
)
