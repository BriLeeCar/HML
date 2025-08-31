import {
	List,
	P,
	Section,
	SectionHeading,
	SubSection,
} from '~/components/index'

const StartPage = () => {
	return (
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
					requirements, but they can take a long time to obtain.
					Asylum is usually faster, but it can be more complicated and
					risky.
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
						If denied, you are still free to explore other visa
						options.
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
						Free to apply; temporary housing, food, and medical
						support are often provided during the process.
					</li>
					<li>
						If denied, <strong>possible entry bans</strong> or forced
						return will be implemented by the local goverment.
					</li>
				</List>
			</SubSection>
		</Section>
	)
}

export default StartPage
