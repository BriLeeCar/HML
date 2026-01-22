import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '~/server/api/root'
import { type createTRPCContext } from '~/server/api/trpc'

declare global {
	namespace TRPC {
		type Router = AppRouter

		type Router<R extends AppRouter> = {
			Input: inferRouterInputs<R>
			Output: inferRouterOutputs<R>
		}
		type RouterInputs = inferRouterInputs<AppRouter>
		type RouterOutputs = inferRouterOutputs<AppRouter>

		type PublicCTX = { ctx: Omit<Awaited<ReturnType<typeof createTRPCContext>>, 'session'> }

		type ProtectedCTX = {
			ctx: Omit<Awaited<ReturnType<typeof createTRPCContext>>, 'session'> & {
				session: {
					user: Auth.User
				}
			}
		}
		type UnknownCTX = PublicCTX | ProtectedCTX

		type CTX<T = null> =
			T extends 'protected' ? ProtectedCTX
			: T extends 'public' ? PublicCTX
			: UnknownCTX
	}
}
