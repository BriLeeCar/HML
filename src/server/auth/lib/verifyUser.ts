import { redirect } from 'next/navigation'
import { auth } from '..'

export const verifyUser = async () => {
	const authed = await auth()
	const user = authed?.user
	console.log(user)
	!user && redirect('/admin/auth/signin')
}
