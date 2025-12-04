import { TRPCReactProvider } from '../../trpc/react'

const Layout = async ({ children }: Props) => {
	return <TRPCReactProvider>{children}</TRPCReactProvider>
}

export default Layout
