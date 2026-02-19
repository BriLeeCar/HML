import { CTA } from '~/components/CTA'
import { Divider } from '~/components/Divider'
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
			subtitle={
				<>
					Find verified country safety data and visa pathways that align with your needs using our
					Visa Explorer. We also have a growing library of resources and guides to get you started
					on your journey.
				</>
			}
			secondaryAction={{
				href: '/guides-resources',
				label: 'Browse the Library',
			}}
			primaryAction={{
				href: '/explorer',
				label: 'Explore Now',
			}}>
			Explore Your Options
		</CTA>
	</Page>
)

export default Layout
