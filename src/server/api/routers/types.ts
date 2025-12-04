import type { User } from 'next-auth'
import { type createTRPCContext } from '../trpc'
export type tCTX = tPublicCTX | tProtectedCTX
export type tPublicCTX = Awaited<ReturnType<typeof createTRPCContext>>
export type tProtectedCTX = Awaited<
	ReturnType<typeof createTRPCContext> & { session: { user: { id: string } & User } }
>
