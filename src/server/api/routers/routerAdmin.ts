import z from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const AdminRouter = createTRPCRouter({
	verify: protectedProcedure.query(({ ctx }) => {
		return ctx.userRoles.filter(r => r.name == 'admin').length > 0
	}),
	toggleForm: protectedProcedure
		.input(z.literal('on').or(z.literal('off')))
		.mutation(async ({ input, ctx }) => {
			if (ctx.userRoles.filter(r => r.name == 'admin').length == 0) {
				throw new Error('Unauthorized')
			}

			const updated = await ctx.db.settings.update({
				where: {
					key: 'contact-form',
				},
				data: {
					value: input,
				},
			})

			return updated
		}),
})
