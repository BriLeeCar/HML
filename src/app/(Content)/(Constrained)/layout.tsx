const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='h-fill mx-auto mb-8 flex max-w-3xl flex-col justify-center'>
			{children}
		</main>
	)
}
export default Layout
