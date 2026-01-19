import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import z, { ZodError } from 'zod'

import { auth } from '~/server/auth'
import db from '~/server/prisma/db'

export const createTRPCContext = async (opts: { headers: Headers }) => {
	const session = await auth()
	const userData = await db.user.findFirst({
		cacheStrategy: {
			ttl: 300000,
		},
		where: { id: session?.user?.id },
		select: {
			roles: {
				select: {
					role: true,
				},
			},
		},
	})

	return {
		db,
		userRoles: userData?.roles.map(r => r.role) ?? [],
		session,
		...opts,
	}
}

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? z.treeifyError(error.cause).errors : null,
			},
		}
	},
})

export const createCallerFactory = t.createCallerFactory
export const createTRPCRouter = t.router
export const mergeTRPCRouter = t.mergeRouters

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	try {
		if (!ctx.session?.user) {
			throw new TRPCError({ code: 'UNAUTHORIZED' })
		}
	} catch (e) {
		console.warn(e)
	}
	return next({
		ctx: {
			// infers the `session` as non-nullable
			session: { ...ctx.session, user: ctx.session?.user },
		},
	})
})
