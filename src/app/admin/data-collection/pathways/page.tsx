import { api } from 'query'
import { Base } from './Base'

import { verifyUser } from '~/server/auth/lib/verifyUser'

const VisaPathwayCollectionPage = async () => {
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
		<Wrapper>
			<Base prisma={query} />
		</Wrapper>
	)
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className='min-h-screen max-w-screen'>{children}</div>
)

export default VisaPathwayCollectionPage
