import {
	CTA,
	Divider,
	InlineLink,
	List,
	P,
	Page,
	PageHeading,
	Section,
	SectionHeading,
} from '~/components'

export default function SupportTeam() {
	return (
		<Page>
			<PageHeading
				eyebrow='Support Team'
				subtitle='Our goal is to make sure you feel supported in creating the evacuation plan that works best for you.'>
				We're here to help
			</PageHeading>

			<Section>
				<div className='lg:pr-8'>
					<SectionHeading>You are not alone</SectionHeading>

					<P>
						We’ll help you identify your most important support needs,
						explore which pathways may suit you best, and then walk
						with you through the steps of organizing, arranging, and
						planning along that pathway.
					</P>
					<P>
						Many members of the Support Team have also had to leave
						their home country. Whenever possible, you’ll speak with
						someone who has chosen and experienced a pathway similar
						to your own. We know that leaving behind a life—people,
						places, and things—is never easy. If you are truly ready
						to leave, or if you feel you cannot stay, we are here to
						make the logistics and mechanics as clear and manageable
						as possible.
					</P>
				</div>
			</Section>
			<Divider />
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
				<List type={'numbered'}>
					<li>
						<InlineLink href='/get-ready-to-leave'>
							Get Ready to Leave
						</InlineLink>{' '}
						provides important information about documentation and the
						general overview of the process. It also provides
						additional readings and resources.
					</li>
					<li>
						<InlineLink href='/claiming-asylum'>
							Claiming Asylum: What it Means and Where to Start
						</InlineLink>{' '}
						provides important information about what asylum actually
						means, and if it is the right pathway for you.
					</li>
				</List>
			</Section>
			<Divider />
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
		</Page>
	)
}
