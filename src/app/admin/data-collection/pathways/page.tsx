import { redirect } from 'next/navigation'
import { verifyUser } from '~/server/auth/lib/verifyUser'

const VisaPathwayCollectionPage = async () => {
	await verifyUser()

	redirect('/admin/pathways/add')
}

export default VisaPathwayCollectionPage
