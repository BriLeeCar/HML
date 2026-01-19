import { Page } from '~/components/Structure/Page'

type TemplateKeys = 'heading' | 'children'
type OptionalTemplateKeys = 'eyebrow' | 'subtitle'

export const PageTemplate = ({
	eyebrow,
	heading,
	subtitle,
	children,
}: Required<Record<TemplateKeys, ReactNode>>
	& Partial<Record<OptionalTemplateKeys, ReactNode>>) => {
	return (
		<Page>
			<Page.HGroup>
				{eyebrow && <Page.Eyebrow>{eyebrow}</Page.Eyebrow>}
				<Page.Heading>{heading}</Page.Heading>
				{subtitle && <Page.Subtitle>{subtitle}</Page.Subtitle>}
			</Page.HGroup>
			{children}
		</Page>
	)
}
