import { LayoutWrapper } from './client/Wrapper'

export const NotAuthorized = ({ title }: { title?: string }) => {
	return (
		<LayoutWrapper title={title ?? 'Not Authorized'}>
			<p className='text-center text-red-600'>You do not have permission to access this page.</p>
		</LayoutWrapper>
	)
}
