import { type createTRPCContext } from '../trpc'

export type tCTX = tPublicCTX | tProtectedCTX | tNACTX
export type tPublicCTX = Awaited<ReturnType<typeof createTRPCContext>>
export type tProtectedCTX = Awaited<
	ReturnType<typeof createTRPCContext> & {
		session: {
			user: Auth.User
		}
	}
>

export type tNACTX = (Omit<tPublicCTX, 'session'> | Omit<tProtectedCTX, 'session'>) & {
	session: {
		user: Auth.User | undefined
	}
}
