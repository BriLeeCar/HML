import z from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { createUserKey } from './createUserKey.server'

export const UserRouter = createTRPCRouter({
	createUserKey: protectedProcedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => ctx.session?.user && (await createUserKey({ input, ctx }))),
})
