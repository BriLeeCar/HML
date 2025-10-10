import { redirect } from 'next/navigation'
import type { userRouter } from '~/server/api/routers'
import type { zSocial } from '~/server/api/zod'
import { auth } from '~/server/auth'
import { api } from '~/trpc/server'
import { ProfileBase } from './Base'

const SettingsProfilePage = async () => {
	const { id } = (await auth())?.user ?? {}
	if (!id) redirect('/api/auth/signin')
	const user = await api.user.getByIdForProfile(id)
	if (!user) redirect('/api/auth/signin')

	const socialOptions = (await api.socialMedia.getMissing(
		id
	)) as zSocial[]

	return (
		<ProfileBase
			data={user}
			missingSocials={socialOptions}
		/>
	)
}

export type User = Required<
	Awaited<ReturnType<(typeof userRouter)['getByIdForProfile']>>
>

export default SettingsProfilePage
