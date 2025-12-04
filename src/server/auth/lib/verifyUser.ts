import { redirect } from 'next/navigation'
import { auth } from '..'
import { api } from '../../../trpc/server'

export const verifyUser = async () => {
	const { id } = (await auth())?.user ?? {}
	const user = await api.user.getUserById(id)
	if (!user) redirect('/api/auth/signin')
	return user
}
