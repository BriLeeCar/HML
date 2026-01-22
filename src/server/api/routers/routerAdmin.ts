import z from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const AdminRouter = createTRPCRouter({
	toggleForm: protectedProcedure
		.input(z.literal('on').or(z.literal('off')))
		.mutation(async ({ input, ctx }) => {
			if (ctx.session?.user?.roles.filter(r => r.name == 'admin').length == 0) {
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
