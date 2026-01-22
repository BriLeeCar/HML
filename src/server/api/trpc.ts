import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import z, { ZodError } from 'zod'
import { auth } from '~/server/auth'
import db from '~/server/prisma/db'

export const createTRPCContext = async (opts: { headers: Headers }) => {
	const session = await auth()
	await maybeLogRoleMismatch(session)

	return {
		db,
		session,
		...opts,
	}
}

const maybeLogRoleMismatch = async (session: Auth.Session | null) => {
	if (process.env.NODE_ENV !== 'production') return
	if (Math.random() >= 0.05) return

	const userId = session?.user?.id
	if (!userId) return

	const dbUser = await db.user.findUnique({
		where: { id: userId },
		select: {
			roles: {
				select: {
					role: true,
				},
			},
		},
	})

	const sessionRoleIds = new Set(
		(session?.user?.roles ?? [])
			.map(role => role?.id)
			.filter((roleId): roleId is number => typeof roleId === 'number')
	)
	const dbRoleIds = new Set(
		(dbUser?.roles ?? [])
			.map(entry => entry.role?.id)
			.filter((roleId): roleId is number => typeof roleId === 'number')
	)

	const mismatch =
		sessionRoleIds.size !== dbRoleIds.size
		|| [...sessionRoleIds].some(roleId => !dbRoleIds.has(roleId))

	if (mismatch) {
		console.warn('auth-role-mismatch', {
			userId,
			sessionRoles: session?.user?.roles?.map(role => ({
				id: role.id,
				name: role.name,
			})),
			dbRoles: dbUser?.roles?.map(entry => ({
				id: entry.role.id,
				name: entry.role.name,
			})),
		})
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
