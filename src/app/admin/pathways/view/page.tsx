import { LayoutWrapper } from '@/admin/_components/client'
import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'
import { api } from '~/trpc/server'
import { Base } from './Base'

const ViewPathwayPage = async ({ searchParams }: PageProps<'/admin/pathways/view'>) => {
	const session = await auth()
	if (!session) {
		return redirect('/admin/auth/signin')
	}

	const { pathwayId } = (await searchParams) as { pathwayId: string }
	const { pathway, pathwayTypes } = await api.pathway.getById(pathwayId)

	return pathway ?
			<LayoutWrapper title='Pathway Details'>
				<Base
					pathway={pathway}
					user={session.user}
					pathwayTypes={pathwayTypes}
				/>
			</LayoutWrapper>
		:	<LayoutWrapper title='Pathway Not Found'>
				<p>The requested pathway could not be found.</p>
			</LayoutWrapper>
}

export default ViewPathwayPage
