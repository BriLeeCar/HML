import { NavMenu } from './_Layout/TopNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header className='sticky top-0 z-99 w-full backdrop-blur-sm'>
				<NavMenu />
			</header>
			{children}
			<footer className='absolute bottom-2 w-full p-2 text-center'>
				<small className='text-xs italic'>
					&copy; HelpMeLeave {new Date().getFullYear()}
				</small>
			</footer>
		</>
	)
}

export default Layout
