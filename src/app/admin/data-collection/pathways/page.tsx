import { PathwayForm } from './Form'
import { GetHandle } from './Handleinput'

const VisaPathwayCollectionPage = async ({
	searchParams,
}: PageProps<'/admin/data-collection/pathways'>) => {
	const { handle } = await searchParams

	return (
		<div className='dark:bg-background min-h-screen max-w-screen'>
			{!handle ?
				<GetHandle />
			:	<PathwayForm handle={handle as string} />}
		</div>
	)
}

export default VisaPathwayCollectionPage
