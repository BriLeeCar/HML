import { AnnouncementBanner } from './_components/AnnouncementBanner'
import { Footer } from './_components/Footer'
import { NavMenu } from './_components/TopNav'

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header className='sticky top-0 z-99 w-full backdrop-blur-sm'>
				<NavMenu />
			</header>
			<div className='h-full w-full'>
				{children}
				<Footer />
			</div>
			<AnnouncementBanner />
		</>
	)
}

export default Layout
