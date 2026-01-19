import { CTA, Divider } from '~/components'
import { Page } from '~/components/Structure/Page'

const Layout = ({ children }: { children?: ReactNode }) => (
	<Page>
		<Page.HGroup>
			<Page.Eyebrow>Escape Routes</Page.Eyebrow>
			<Page.Heading>Help Me Leave NOW</Page.Heading>
			<Page.Subtitle>
				We know that many people need to leave quickly. We are here to help you explore your options
				and make a plan.
			</Page.Subtitle>
		</Page.HGroup>

		{children}

		<Divider />
		<CTA
			subtitle='We appreciate that information overwhelm can come on very easily – the stakes are high and  there are a lot of things to consider. The Help Me Leave Support team provides 1-1 support to help you understand your options and make the choices that are best for you.'
			primaryAction={{
				href: '/support',
				label: 'Get In Touch',
			}}>
			How To Get Support
		</CTA>
	</Page>
)

export default Layout
