import {
	InlineLink,
	Page,
	PageHeading,
	Section,
	SectionHeading,
	SubSection,
} from '@/(Content)/Components'
import { Fragment } from 'react'
import { AlertCallout } from '~/components/AlertCallout'
import { Icon } from '~/components/Icon'
import { List, P } from '~/components/Text'

const ClaimingAsylumPage = () => {
	return (
		<Page>
			<PageHeading
				eyebrow={
					<>
						Guides{' '}
						<Icon
							IconName='ArrowRightIcon'
							className='inline-block'
						/>{' '}
						Claiming Asylum
					</>
				}
				subtitle={
					<>
						<AlertCallout>
							This page is for information only. It is not legal
							advice. Rules differ by country and can change quickly.
							If you need urgent help, see{' '}
							<InlineLink href='#get-help-now'>
								Get help now
							</InlineLink>
						</AlertCallout>

						<AlertCallout>
							At this time{' '}
							<InlineLink
								href='https://ccrweb.ca/sites/ccrweb.ca/files/static-files/documents/noticeclaimants.htm'
								target='_blank'
								rel='noopener noreferrer'>
								Canada is not a safe route for asylum claims
							</InlineLink>
						</AlertCallout>
					</>
				}>
				What It Means and Where to Start
			</PageHeading>
			<WhatItMeans />
			<WhoCanClaim />
			<TheProcess />
			<BasicRights />
			<Evidence />
			<OtherConsiderations />
			<HelpNow />
			<FAQ />
		</Page>
	)
}

const Bold = ({ children }: { children: React.ReactNode }) => (
	<strong className='font-semibold text-red-600'>{children}</strong>
)

const WhatItMeans = () => (
	<Section>
		<SectionHeading
			subtitle={
				<>
					Download our guide to EU asylum claims:{' '}
					<InlineLink href='/pdf/Making-A-Decision-Visa-v-Asylum-Paths.pdf'>
						Visa or Asylum? EU Overview Guide (PDF)
					</InlineLink>
				</>
			}
			eyebrow="What Asylum is...and what it isn't">
			If your main concern is safety from persecution or harm, asylum
			may be the right pathway.
		</SectionHeading>
		<SubSection
			title='Quick Facts'
			className='text-foreground'>
			<List>
				<li>
					Asylum <Bold>is</Bold> a form of legal protection for people
					fleeing persecution or serious harm in their home country.
				</li>
				<li>
					It <Bold>isn’t</Bold> a visa for travel, work, or study.
				</li>
				<li>
					You <Bold>can</Bold> apply for asylum at the border or
					inside the country where you seek protection.
				</li>
				<li>
					The process <Bold>usually</Bold> involves registration, an
					application, an interview, and a decision.
				</li>
				<li>
					During the process, <Bold>you have rights</Bold> to stay,
					basic support, and legal help.
				</li>
				<li>
					<Bold>
						Bringing evidence of your situation can strengthen your
						claim.
					</Bold>
				</li>
				<li>
					Rules and procedures vary by country, so{' '}
					<Bold>seek local advice</Bold>.
				</li>
			</List>
		</SubSection>
	</Section>
)

const WhoCanClaim = () => (
	<Section>
		<SectionHeading
			eyebrow='Eligibility'
			subtitle='You can apply for asylum if you have a well-founded fear of
				persecution in your home country because of at least one of
				the following:'>
			Who can claim asylum?
		</SectionHeading>
		<List>
			<li>Race or ethnicity</li>
			<li>Religion or belief</li>
			<li>Nationality</li>
			<li>Political opinion</li>
			<li>
				Membership of a particular social group (e.g., LGBTQ+ people,
				survivors of gender-based violence, certain family or
				community groups)
			</li>
			You must be <Bold>physically present</Bold> in the country where
			you are applying (or at its border). You do not need a visa to
			make an asylum claim.
		</List>
	</Section>
)

const TheProcess = () => (
	<Section>
		<SectionHeading
			eyebrow='The typical steps'
			subtitle='Exact steps vary by country, but most asylum systems follow a
				similar pattern'>
			How the process usually works
		</SectionHeading>
		<List type='numbered'>
			<li>
				<Bold>Declare your intent</Bold> – Tell border officials,
				police, or the asylum office that you want protection.
			</li>
			<li>
				<Bold>Registration</Bold> – Authorities record your personal
				details and may take fingerprints or photos.
			</li>
			<li>
				<Bold>Application</Bold> – You fill out forms and explain why
				you cannot safely return home.
			</li>
			<li>
				<Bold>Interview</Bold> – You describe your story and reasons
				for seeking protection (an interpreter is usually provided).
			</li>
			<li>
				<Bold>Decision</Bold> – Officials decide whether you qualify
				for:
				<List>
					<li>
						<Bold>Refugee status </Bold>– Usually includes residence
						rights, work authorization, and eventual long-term stay.
					</li>
					<li>
						<Bold>Subsidiary or humanitarian protection</Bold> –
						Shorter permits if you face serious harm but do not meet
						the refugee definition.
					</li>
					<li>
						<Bold>Rejection</Bold> – Your application may be refused.
						You often have the right to
						<Bold>appeal</Bold>.
					</li>
				</List>
			</li>
			<li>
				<Bold>Appeal</Bold> – If refused, you may have a right to
				challenge the decision in court. Deadlines are short.
			</li>
		</List>
	</Section>
)

const BasicRights = () => (
	<Section>
		<SectionHeading
			eyebrow='Basic Rights'
			subtitle='While your case is being examined, you generally have the right
			to'>
			Your basic rights during the process
		</SectionHeading>
		<List>
			<li>
				Have your claim heard fairly (with an interview and
				interpreter if needed)
			</li>
			<li>Stay in the country until a decision is made </li>
			<li>
				Receive basic shelter, food, or support (this differs by
				country)
			</li>
			<li>Access at least emergency healthcare</li>
			<li>
				Get free or low-cost legal help from NGOs or legal aid
				providers
			</li>
			<li>Appeal a negative decision within set deadlines</li>
		</List>
		<P>
			You may also have duties (attending appointments, living in
			assigned accommodation, reporting regularly to authorities).
		</P>
	</Section>
)

const Evidence = () => (
	<Section>
		<SectionHeading
			eyebrow='Evidence that can help'
			subtitle='If you do not have documents, you can still apply. Explain
			clearly why documents are missing.'>
			Evidence that can help
		</SectionHeading>
		<List>
			<li>
				Bring what you can safely carry, such as:
				<List>
					<li className='leading-tight'>
						<Bold>Identity documents</Bold>
						<br />
						(passport, ID card, birth/marriage certificates)
					</li>
					<li className='leading-tight'>
						<Bold>Proof of threats or harm</Bold>
						<br />
						police or court reports, medical records, letters, social
						media posts, photos, news articles
					</li>
					<li className='leading-tight'>
						<Bold>Membership or affiliation documents</Bold>
						<br />
						party cards, union membership, LGBTQ+ or activist group
						records
					</li>
				</List>
			</li>
		</List>
		<P>
			We have an{' '}
			<InlineLink
				href='https://docs.google.com/document/d/1Fu9Z27YR5pUAZ417aw28ua9eOm3IHa4FQNUe98g0SPE/edit?usp=sharing'
				target='_blank'>
				evidence ‘locker’
			</InlineLink>{' '}
			created by{' '}
			<InlineLink
				href='https://www.tiktok.com/@passion_torn'
				target='_blank'>
				Jey Peston
			</InlineLink>
			, which he is using as part of his asylum claim
		</P>
	</Section>
)

const OtherConsiderations = () => (
	<Section>
		<SectionHeading
			eyebrow='Other Considerations'
			id='other-considerations'>
			Good to know!
		</SectionHeading>
		<List>
			<li>
				Many countries allow you to apply for family reunification
				after recognition.
			</li>
			<li>You can usually request an interpreter in your language</li>
			<li>
				You may be able to ask for a female or male
				interviewer/interpreter if you feel unsafe.
			</li>
			<li>
				If you are LGBTQIA+ or a survivor of violence, tell legal
				advisors so they can request safer housing or confidentiality
				measures.
			</li>
			<li>
				Travel during the asylum process is usually restricted. Once
				recognized, you may be issued a refugee travel document.
			</li>
		</List>
	</Section>
)

const HelpNow = () => (
	<Section
		id='get-help-now'
		className='scroll-mt-20'>
		<SectionHeading>Get help now</SectionHeading>
		<List>
			<li>
				<Bold>Emergency situations</Bold>: Contact local emergency
				services in your current country.
			</li>
			<li>
				<InlineLink href='/support'>
					Contact our support team
				</InlineLink>
			</li>
			<li>
				<Bold>Reliable global resources</Bold>:
				<List>
					<li>
						<InlineLink
							href='https://help.unhcr.org'
							target='_blank'>
							UNHCR Help
						</InlineLink>
						<br />
						Country-specific guidance and contacts:
					</li>
					<li>
						<InlineLink
							href='https://iom.int'
							target='_blank'>
							IOM (International Organization for Migration)
						</InlineLink>
						- Assistance with migration and protection
					</li>
					<li>
						<Bold>Local NGOs and refugee legal aid groups </Bold>–
						Search “[asylum legal aid + country]” or ask UNHCR/IOM for
						trusted referrals.
					</li>
				</List>
			</li>
		</List>
	</Section>
)

const FAQ = () => {
	const questions = [
		{
			question: 'Do I lose my citizenship if I am granted asylum?',
			answer:
				'No. Asylum gives you legal protection in your host country, but you remain a citizen of your country of origin. You may later apply for citizenship in your host country, but that is a separate process. Some countries allow dual nationality; others may require you to renounce your original citizenship.',
		},
		{
			question:
				'Does asylum give me permanent residence or citizenship right away?',
			answer:
				'Not usually. First you are given a temporary protection status (often renewable). Permanent residence or citizenship usually comes later and only after meeting specific requirements, such as a certain period of residence, language proficiency, and integration into society.',
		},
		{
			question: 'Can I travel while my asylum claim is pending?',
			answer:
				'Normally no. Most countries require you to stay while your claim is being processed. After recognition, you may receive a refugee travel document, but you usually cannot travel back to your home country.',
		},
		{
			question: 'Can my family join me?',
			answer:
				'Many countries allow family reunification if your asylum claim is accepted. The definition of “family” varies (often spouse/partner and children under 18). You will need to apply separately for family members to join you.',
		},
		{
			question: 'Can I work while waiting for a decision?',
			answer:
				'Rules differ. Some countries let you work after a waiting period, others restrict work until your claim is approved. Always check national laws and seek legal advice if possible.',
		},
		{
			question: 'What happens if my claim is refused?',
			answer:
				'You usually have the right to appeal within a short deadline. If your appeal is unsuccessful, you may be asked to leave or could be returned to your home country — unless you qualify for another form of legal stay.',
		},
	]

	return (
		<Section>
			<SectionHeading>Common Questions about Asylum</SectionHeading>
			<section className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
				{questions.map((q, index) => (
					<Fragment key={index}>
						<h3 className='mt-4 font-semibold text-red-600 not-first:mt-4'>
							{q.question}
						</h3>
						<P className='mt-0 pl-12'>{q.answer}</P>
					</Fragment>
				))}
			</section>
		</Section>
	)
}

export default ClaimingAsylumPage
