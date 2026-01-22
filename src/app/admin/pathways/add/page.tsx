import { api } from '~/serverQuery'
import { Base } from './Base'

import { LayoutWrapper } from '@/admin/_components/client'
import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'

const NewPathway = async () => {
	const session = await auth()
	if (!session) {
		return redirect('/admin/auth/signin')
	}

	const query = await api.dataCollection.PathwayInit({
		countries: {
			query: [],
			select: {
				code: true,
				name: true,
				currencies: true,
				languages: true,
			},
		},
	})

	return (
		<LayoutWrapper title='Add Pathway Form'>
			<Base
				prisma={query}
				user={session.user}
			/>
		</LayoutWrapper>
	)
}

export default NewPathway
