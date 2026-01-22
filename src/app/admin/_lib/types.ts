import type { PageHeading } from '~/components/Structure/Page'

type tBreadcrumb = {
	label: string
	href: string
}

export type tLayoutWrapperProps<T extends 'breadcrumbs' | 'eyebrow' | '' = ''> = {
	children: ReactNode
	title?: ReactNode
	subtitle?: ReactNode
} & Props<typeof PageHeading>
	& (T extends 'breadcrumbs' ?
		{
			breadcrumbs: tBreadcrumb[]
		}
	: T extends 'eyebrow' ?
		{
			eyebrow: ReactNode
		}
	:	{ eyebrow?: ReactNode | undefined })
