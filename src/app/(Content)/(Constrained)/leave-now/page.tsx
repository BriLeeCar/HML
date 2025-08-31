import Link from 'next/link'
import { ReactNode } from 'react'
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
	SubSection,
} from '~/components'

const LeaveNow = async (props: PageProps<'/leave-now'>) => {
	const searchParams = await props.searchParams
	if (Object.keys(searchParams).length == 0) {
		return (
			<MainPage>
				<div className='text-foreground *:hover:text-muted-foreground *:decoration-brand-bright my-10 flex flex-col justify-around *:px-8 *:py-6 *:text-3xl *:font-semibold *:underline *:decoration-2 *:underline-offset-4 md:flex-row'>
					<Link href='?start'>How to Start</Link>
					<Link href='?leave'>How to Leave</Link>
				</div>
			</MainPage>
		)
	}

	const paramKeys = Object.keys(searchParams)[0]

	if (paramKeys == 'start') {
		return (
			<MainPage>
				<StartPage />
			</MainPage>
		)
	}
	if (paramKeys == 'leave') {
		return (
			<MainPage>
				<LeavePage />
			</MainPage>
		)
	}
}

const MainPage = ({ children }: { children?: ReactNode }) => (
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

const StartPage = () => (
	<Section>
		<div className='lg:pr-8'>
			<SectionHeading
				eyebrow='How to Start'
				subtitle='If you enter on a visa, you may not qualify for asylum later. Choosing one path sometimes rules out the others.'>
				Visa vs. Asylum
				<br />
				Each has its own requirements, benefits, and risks.
			</SectionHeading>

			<P>
				As a general rule, visas are better if you can meet the
				requirements, but they can take a long time to obtain. Asylum
				is usually faster, but it can be more complicated and risky.
			</P>
		</div>
		<SubSection title='Work or Study Visa'>
			<List>
				<li>
					Often requires a sponsor (employer, university, or family)
					or significant funds.
				</li>
				<li>
					Strict eligibility: financial proof, documents, background
					checks.
				</li>
				<li>Processing can take weeks or months.</li>
				<li>
					If approved, a residence permit is issued for a set period
					of time.
				</li>
				<li>
					If denied, you are still free to explore other visa options.
				</li>
			</List>
		</SubSection>
		<SubSection title='Tourist Visa'>
			<List>
				<li>
					There are lots of places where American citizens can get
					lengthy tourist visas either immediately or very quickly.
				</li>
				<li>
					Many work or study visas have to be applied for FROM your
					home country.
				</li>
				<li>
					May also affect your ability to apply for asylum in your
					target country.
				</li>
			</List>
		</SubSection>
		<SubSection title='Asylum'>
			<List>
				<li>
					Only for people with a well-founded fear of persecution
					(e.g. political opinion, religion, race, sexuality, social
					group).
				</li>
				<li>
					Must usually apply on arrival in the country of refuge.
				</li>
				<li>
					Free to apply; temporary housing, food, and medical support
					are often provided during the process.
				</li>
				<li>
					If denied, <strong>possible entry bans</strong> or forced
					return will be implemented by the local goverment.
				</li>
			</List>
		</SubSection>
	</Section>
)

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
							<InlineLink
								href='/top-visa-options'
								target='_blank'>
								Top Visa routes
							</InlineLink>
						</li>
						<li>
							<InlineLink
								href='/top-asylum-options'
								target='_blank'>
								Top Asylum routes
							</InlineLink>
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

export default LeaveNow
