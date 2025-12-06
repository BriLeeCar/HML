// import {
// 	blogPostRouter,
// 	socialMediaRouter,
// 	tagRouter,
// 	userRouter,
// } from '~/server/api/routers'
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'

import * as router from '~/server/api/routers'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: router.UserRouter,
	country: router.CountryRouter,
	dataCollection: router.DataCollectionRouter,
	pathway: router.PathwayRouter,
	language: router.LanguageRouter,
	currency: router.CurrencyRouter,
	admin: router.AdminRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
