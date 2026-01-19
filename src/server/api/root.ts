import * as Router from '~/server/api/routers'
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
	user: Router.UserRouter,
	country: Router.CountryRouter,
	dataCollection: Router.DataCollectionRouter,
	contentResources: Router.ContentResources,
	pathway: Router.PathwayRouter,
	language: Router.LanguageRouter,
	currency: Router.CurrencyRouter,
	admin: Router.AdminRouter,
	post: Router.PostRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
