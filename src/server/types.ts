import { type ztUser, type ztUserKey } from '~/server/api/zod'

export type CredentialsBase = {
	username: ztUser['name']
	password: ztUser['secret']
	key: ztUserKey['key']
}

export type tTokenCB = {
	sub?: string
	roles?: Auth.Role[]
	email?: string | null
	exp?: number
	iat?: number
	jti?: string
	name?: string | null
}
