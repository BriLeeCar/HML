import { Base } from './_Form/Base'
import { APPROVED_HANDLES } from './constants'

import { GetHandle } from './HandleInput'

const VisaPathwayCollectionPage = async ({
	searchParams,
}: PageProps<'/admin/data-collection/pathways'>) => {
	const { handle } = await searchParams

	console.log(handle)

	if (!handle) {
		return (
			<Wrapper>
				<GetHandle />
			</Wrapper>
		)
	}

	if (!Object.keys(APPROVED_HANDLES).includes(handle as string)) {
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
	<div className='dark:bg-background min-h-screen max-w-screen'>{children}</div>
)

export default VisaPathwayCollectionPage
