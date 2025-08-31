import { ReactNode } from 'react'
import { CTA, Divider, Page, PageHeading } from '~/components'

const Layout = ({ children }: { children?: ReactNode }) => (
	<Page>
		<PageHeading
			eyebrow='Escape Routes'
			subtitle='We know that many people need to leave quickly. We are here to help you explore your options and make a plan.'>
			Help Me Leave NOW
		</PageHeading>

		{children}

		<Divider />
		<CTA
			subtitle='We appreciate the information overwhelm is very easy – the stakes are high and the are a lot of things to consider. The Help Me Leave Support team provides 1-1 support to help you understand your options and make the choices that are best for you.'
			primaryAction={{
				href: '/support',
				label: 'Get In Touch',
			}}>
			How To Get Support
		</CTA>
	</Page>
)

export default Layout
