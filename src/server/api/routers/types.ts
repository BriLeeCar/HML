import type { User } from 'next-auth'
import { type createTRPCContext } from '../trpc'

export type tCTX = tPublicCTX | tProtectedCTX | tNACTX

export type tPublicCTX = Awaited<ReturnType<typeof createTRPCContext>>

export type tProtectedCTX = Awaited<
	ReturnType<typeof createTRPCContext> & { session: { user: { id: string } & User } }
>

export type tNACTX = (Omit<tPublicCTX, 'session'> | Omit<tProtectedCTX, 'session'>) & {
	session: { user: ({ id: string; role: number } & User) | undefined }
}
