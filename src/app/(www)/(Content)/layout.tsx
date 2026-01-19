import { AnnouncementBanner } from './_components/AnnouncementBanner'
import { CookieContextProvider } from './_components/CookieContextProvider'
import { Footer } from './_components/Footer'
import { NavMenu } from './_components/TopNav'

const Layout = async ({ children }: { children: ReactNode }) => {
	// ! TODO
	// const cookies = Object.fromEntries(await nextCookies())

	return (
		<CookieContextProvider>
			<div className='flex min-h-screen flex-col justify-between'>
				<div className='mb-8 flex flex-col'>
					<header className='sticky top-0 z-99 h-20 w-full backdrop-blur-sm'>
						<NavMenu />
					</header>
					{children}
				</div>
				<Footer />
				{/* <CookieNotification /> */}
				<AnnouncementBanner />
			</div>
		</CookieContextProvider>
	)
}

export default Layout
