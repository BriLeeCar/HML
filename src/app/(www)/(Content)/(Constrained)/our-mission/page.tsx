import {
	Page as PageEl,
	PageEyebrow,
	PageHeading,
	PageHGroup,
	PageSubtitle,
} from '~/components/Structure/Page'
import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
} from '~/components/Structure/Section'
import { Bold, InlineLink, P } from '~/components/Text'
import { cn } from '~/lib/cn'

const Page = () => {
	return (
		<PageEl>
			<PageHGroup>
				<PageEyebrow>Our Mission</PageEyebrow>
				<PageHeading>About Help Me Leave</PageHeading>
				<PageSubtitle>
					Help Me Leave helps marginalized people find safe and legal pathways to live in other
					countries while advocating for the human rights of refugees and immigrants from all
					countries.
				</PageSubtitle>
			</PageHGroup>
			<Section>
				<SectionHGroup>
					<SectionEyebrow>Our Work</SectionEyebrow>
					<SectionHeading>What We Do</SectionHeading>
				</SectionHGroup>
				<P>
					Millions of people are now facing deteriorating political and legal conditions that put
					them at risk of their health, their freedom and their lives. However, most people who are
					facing discrimination, targeted policies, economic peril, or threats to personal safety
					also lack clear pathways to leave their country of origin.
				</P>
				<P>
					Our purpose is to provide practical <Bold>information</Bold>, <Bold>support</Bold>, and{' '}
					<Bold>advocacy</Bold> to individuals seeking safety and stability outside their country of
					origin.
				</P>
				<ol
					style={{
						counterSet: 'item',
					}}
					className={cn(
						'*:marker:text-hml-mulberry dark:*:marker:text-hml-grey-400 list-decimal pl-10 leading-loose *:list-outside *:marker:text-sm *:marker:font-semibold'
					)}>
					{[
						<>
							<Bold>Information</Bold>: We research, collect, and verify credible{' '}
							<InlineLink href='/explorer'>data about destination countries</InlineLink> for
							potential emigrants, focusing on safety, visa accessibility, and protections for
							marginalized communities.
						</>,
						<>
							<Bold>Support</Bold>: We provide{' '}
							<InlineLink href='/support'>peer-to-peer support</InlineLink> to those who need to
							leave urgently or are in imminent danger, as well as a robust online community that
							fosters information-sharing and solidarity between like-minded individuals.
						</>,
						<>
							<Bold>Advocacy</Bold>: We advocate for the human rights of refugees and immigrants
							from all countries through campaigns and partnerships. Through our current
							#NoLongerSafe campaign, Help Me Leave is advocating for the EU and surrounding nations
							to remove the U.S. from "safe country of origin" and "safe third country" lists.
						</>,
					].map((k, i) => {
						return (
							<li key={i}>
								<span className='block h-auto max-w-full pl-4 wrap-normal'>{k}</span>
							</li>
						)
					})}
				</ol>
			</Section>
			<Section>
				<SectionHGroup>
					<SectionEyebrow>Who We Are</SectionEyebrow>
					<SectionHeading>We Are Everyday People</SectionHeading>
				</SectionHGroup>
				<P>
					Our international team of volunteers is united by a shared belief that everyone deserves
					access to accurate, up-to-date information and that informed decisions are safer
					decisions. Many of us have lived through migration ourselves. We know how overwhelming it
					can be to navigate complex government systems while facing threats to your rights, safety
					and survival.
				</P>
				<P>
					This work is grounded in human rights, harm reduction, and informed consent. We never
					encourage unsafe or illegal routes, nor do we glamorize the difficult immigration process.
					We aim to meet people where they are and provide tools to help them make informed
					decisions for themselves and their families.
				</P>
				<P>
					For press inquiries, organizational or donation interest, or to request to speak with a
					team member for non-support-related items, please{' '}
					<InlineLink
						href='https://forms.clickup.com/90151711045/f/2kyqbwa5-10135/WAWHBFWDES3CH80TYC'
						target='_blank'>
						fill out our contact form
					</InlineLink>
					.
				</P>
			</Section>
		</PageEl>
	)
}

export default Page
