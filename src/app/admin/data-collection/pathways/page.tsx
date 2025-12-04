import { api } from 'query'
import { Base } from './_Form/Base'

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

	// const pipelines = await api.dataCollection.Select()
	// query['new'] = pipelines

	return (
		<Wrapper>
			<Base prisma={query} />
		</Wrapper>
	)
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className='dark:bg-background min-h-screen max-w-screen'>{children}</div>
)

export default VisaPathwayCollectionPage
