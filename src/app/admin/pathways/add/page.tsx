import { api } from 'query'
import { Base } from './Base'

import { LayoutWrapper } from '@/admin/_components/client'
import { verifyUser } from '~/server/auth/lib/verifyUser'

const NewPathway = async () => {
	await verifyUser()

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
		<LayoutWrapper
			subtitle={<span>Please let us know of any issues when filling out the form!</span>}
			title='Add Pathway Form'>
			<Base prisma={query} />
		</LayoutWrapper>
	)
}

export default NewPathway
