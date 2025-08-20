const Layout = async ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main className='relative grid h-auto min-h-screen w-screen grid-cols-[1fr_1fr] overflow-x-hidden min-[1200px]:static min-[1200px]:w-[75vw]'>
			{children}
		</main>
	)
}

export default Layout
