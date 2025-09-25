import {
	InlineLink,
	Li,
	Section,
	SectionHeading,
	SubSection,
	UL,
} from '~/components'

import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'How to Leave',
	description:
		'The Help Me Leave team has compiled lists and resources to help you with each step of the process.',
}

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
					<UL>
						<Li>
							<InlineLink
								href='/pdf/Get-Your-Documents-Ready.pdf'
								target='_blank'>
								Get Your Documents Ready
							</InlineLink>
						</Li>
						<Li>
							<InlineLink
								href='/pdf/Passport-Checklist.pdf'
								target='_blank'>
								Apply for a passport
							</InlineLink>
						</Li>
						<Li>
							<InlineLink
								href='/pdf/REAL-ID-Checklist.pdf'
								target='_blank'>
								REAL ID
							</InlineLink>
						</Li>
						<Li>
							<InlineLink
								href='/pdf/Replace-Birth-Certificate-Checklist.pdf'
								target='_blank'>
								Birth certificate
							</InlineLink>
						</Li>
					</UL>
				</SubSection>
				<SubSection title='Choosing your destination'>
					<UL>
						<Li>
							<InlineLink href='/claiming-asylum'>
								Claiming Asylum: What it Means and Where to Start
							</InlineLink>
						</Li>
						<Li>
							<InlineLink href='/explorer'>Visa Explorer</InlineLink>
						</Li>
					</UL>
				</SubSection>
				<SubSection title='Preparing to leave'>
					<UL>
						<Li>
							<InlineLink
								href='/pdf/How-To-Book-a-Flight.pdf'
								target='_blank'>
								Booking a flight
							</InlineLink>
						</Li>
						<Li>
							<InlineLink
								href='/pdf/Moving-Checklist.pdf'
								target='_blank'>
								Moving checklist
							</InlineLink>
						</Li>
						<Li>
							<InlineLink
								href='/pdf/First-Month-Checklist.pdf'
								target='_blank'>
								Your first month
							</InlineLink>
						</Li>
					</UL>
				</SubSection>
			</div>
		</Section>
	)
}

export default LeavePage
