import { AnnouncementBanner } from './_components/TopBanner'
import { NavMenu } from './_components/TopNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header className='sticky top-0 z-99 w-full backdrop-blur-sm'>
				<NavMenu />
				<AnnouncementBanner />
			</header>
			{children}
		</>
	)
}

export default Layout
