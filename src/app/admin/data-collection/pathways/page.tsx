import { Base } from './_Form/Base'
import { approvedHandles } from './approvedHandles'

import { GetHandle } from './HandleInput'

const VisaPathwayCollectionPage = async ({
	searchParams,
}: PageProps<'/admin/data-collection/pathways'>) => {
	const { handle } = await searchParams

	if (!handle) {
		return (
			<Wrapper>
				<GetHandle />
			</Wrapper>
		)
	}

	if (!approvedHandles.includes(handle as string)) {
		return (
			<Wrapper>
				<GetHandle />
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<Base handle={handle as string} />
		</Wrapper>
	)
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className='dark:bg-background min-h-screen max-w-screen'>
		{children}
	</div>
)

export default VisaPathwayCollectionPage
