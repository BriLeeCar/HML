import {
	InlineLink,
	List,
	Section,
	SectionHeading,
	SubSection,
} from '~/components/index'

const LeavePage = () => {
	return (
		<Section>
			<div className='lg:pr-8'>
				<SectionHeading
					eyebrow='How to Leave'
					subtitle='Our team has compiled lists and resources to help you with each step of the process.'>
					Getting your documents, choosing your destination, and
					preparing to leave.
				</SectionHeading>
				<SubSection title='Documents'>
					<List>
						<li>
							<InlineLink
								href='/pdf/Get-Your-Documents-Ready.pdf'
								target='_blank'>
								Get Your Documents Ready
							</InlineLink>
						</li>
						<li>
							<InlineLink
								href='/pdf/Passport-Checklist.pdf'
								target='_blank'>
								Apply for a passport
							</InlineLink>
						</li>
						<li>
							<InlineLink
								href='/pdf/REAL-ID-Checklist.pdf'
								target='_blank'>
								REAL ID
							</InlineLink>
						</li>
						<li>
							<InlineLink
								href='/pdf/Replace-Birth-Certificate-Checklist.pdf'
								target='_blank'>
								Birth certificate
							</InlineLink>
						</li>
					</List>
				</SubSection>
				<SubSection title='Choosing your destination'>
					<List>
						<li>
							<InlineLink href='/claiming-asylum'>
								Claiming Asylum: What it Means and Where to Start
							</InlineLink>
						</li>
						<li>
							<InlineLink href='/explorer'>Visa Explorer</InlineLink>
						</li>
					</List>
				</SubSection>
				<SubSection title='Preparing to leave'>
					<List>
						<li>
							<InlineLink
								href='/pdf/How-To-Book-a-Flight.pdf'
								target='_blank'>
								Booking a flight
							</InlineLink>
						</li>
						<li>
							<InlineLink
								href='/pdf/Moving-Checklist.pdf'
								target='_blank'>
								Moving checklist
							</InlineLink>
						</li>
						<li>
							<InlineLink
								href='/pdf/First-Month-Checklist.pdf'
								target='_blank'>
								Your first month
							</InlineLink>
						</li>
					</List>
				</SubSection>
			</div>
		</Section>
	)
}

export default LeavePage
