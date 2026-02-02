import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import type { AdminViewServerProps } from 'payload'

const ViewWrapper = ({
	initPageResult,
	params,
	searchParams,
	title,
	children,
}: AdminViewServerProps & {
	title: string
	children: ReactNode
}) => {
	// const {
	// 	req: { user },
	// } = initPageResult

	// 	 const hasAccess = user?.teams?.some((role) => ['admin', 'editor'].includes(role))

	//   if (!user || !hasAccess) {
	//     redirect('/admin')
	//   }
	return (
		<DefaultTemplate
			i18n={initPageResult.req.i18n}
			locale={initPageResult.locale}
			params={params}
			payload={initPageResult.req.payload}
			permissions={initPageResult.permissions}
			searchParams={searchParams}
			user={initPageResult.req.user || undefined}
			visibleEntities={initPageResult.visibleEntities}>
			<Gutter className='twp mb-10'>
				<div className='twp mt-2 mb-10 text-4xl font-semibold'>{title}</div>
				<div className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3'>{children}</div>
			</Gutter>
		</DefaultTemplate>
	)
}

export default ViewWrapper
