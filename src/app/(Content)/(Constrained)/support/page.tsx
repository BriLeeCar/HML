import { type Metadata } from 'next'
import {
	Bold,
	CTA,
	InlineLink,
	Li,
	OL,
	P,
	Page,
	PageHeading,
	Section,
	SectionHeading,
} from '~/components'
import { FAQ } from './faq'

export const metadata: Metadata = {
	title: 'Support Team',
	description:
		'Our Support Team is here to help you create an evacuation plan that works best for you.',
}

export default function SupportTeam() {
	return (
		<Page>
			<PageHeading
				eyebrow='Support Team'
				subtitle={
					<>
						Our goal is to make sure you feel supported in creating
						the evacuation plan that works best for you.
						<Bold className='block'>You are not alone</Bold>
					</>
				}>
				We're here to help
			</PageHeading>
			<P>
				We’ll help you identify your most important support needs,
				explore which pathways may suit you best, and then walk with
				you through the steps of organizing, arranging, and planning
				along that pathway.
			</P>
			<P>
				Many members of the Support Team have also had to leave their
				home country. Whenever possible, you’ll speak with someone who
				has chosen and experienced a pathway similar to your own. We
				know that leaving behind a life—people, places, and things—is
				never easy. If you are truly ready to leave, or if you feel
				you cannot stay, we are here to make the logistics and
				mechanics as clear and manageable as possible.
			</P>

			<FAQ />

			<Section>
				<SectionHeading
					eyebrow='Before Reaching Out'
					subtitle='To make sure we can help you as best as possible, please
					read the following information before contacting us. These
					documents will help you understand the process and prepare
					for your conversation with our Support Team.'>
					Reaching out can be scary, but asking for help is always the
					right choice—the best choice for you.
				</SectionHeading>
				<OL className='text-balance *:mt-4'>
					<Li className='not-list-label'>
						<InlineLink href='/get-ready-to-leave'>
							Get Ready to Leave
						</InlineLink>
						<ul>
							<li>
								This document is where we recommend you start. It
								outlines essential steps from planning to packing,
								helping you create a personalized evacuation plan.
							</li>
						</ul>
					</Li>
					<Li>
						<InlineLink href='/claiming-asylum'>
							Claiming Asylum: What it Means and Where to Start
						</InlineLink>
						<ul>
							<li>
								Important for those considering asylum as a pathway,
								this guide provides important information about what
								asylum actually means, and if it is the right pathway
								for you.
							</li>
						</ul>
					</Li>
					<Li>
						<InlineLink href='#faq'>
							Frequently Asked Questions
						</InlineLink>
						<ul>
							<li>
								To keep our support team free to process users that
								are in dire need of relocation, we have compiled a
								list of frequently asked questions to help you find
								the information you need quickly.
							</li>
						</ul>
					</Li>
				</OL>
			</Section>

			<CTA
				primaryAction={{
					href: 'https://form.jotform.com/252073139145352',
					label: 'Reach Out',
				}}
				secondaryAction={{
					href: '/get-ready-to-leave',
					label: 'Get Ready to Leave',
				}}>
				If you're ready,
				<br />
				we're ready.
			</CTA>

			{/* <OnHold
				reason='We are working hard to expand our team and resources to
                            better serve you. Please check back in the coming days for
                            updates on when we will be able to accept new requests.'
			/> */}
		</Page>
	)
}
