import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '~/server/api/root'

declare global {
	namespace TRPC {
		type Router = AppRouter

		type Router<R extends AppRouter> = {
			Input: inferRouterInputs<R>
			Output: inferRouterOutputs<R>
		}
		type RouterInputs = inferRouterInputs<AppRouter>
		type RouterOutputs = inferRouterOutputs<AppRouter>
	}
}
