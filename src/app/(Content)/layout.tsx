import { NavMenu } from './_Layout/TopNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header className='sticky top-0 z-99 w-full px-6 py-3'>
				<NavMenu />
			</header>
			<main className='h-fill mx-auto mb-8 flex max-w-3xl flex-col justify-center'>
				{children}
			</main>
			<footer className='absolute bottom-0 w-full p-2 text-center'>
				<small className='text-xs italic'>
					&copy; HelpMeLeave {new Date().getFullYear()}
				</small>
			</footer>
		</>
	)
}

export default Layout
