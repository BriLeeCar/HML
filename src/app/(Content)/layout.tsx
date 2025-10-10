import { NavMenu } from './_Layout/TopNav'

const Layout = ({ children }: LayoutProps<'/'>) => {
	return (
		<>
			<header className='sticky top-0 z-99 w-full backdrop-blur-sm'>
				<NavMenu />
				{/* <PopoverMenu /> */}
			</header>
			{children}
		</>
	)
}

export default Layout
