import { createTRPCRouter, protectedProcedure } from '../trpc'

export const AdminRouter = createTRPCRouter({
	verify: protectedProcedure.query(({ ctx }) => {
		return ctx.userRoles.filter(r => r.name == 'admin').length > 0
	}),
})
