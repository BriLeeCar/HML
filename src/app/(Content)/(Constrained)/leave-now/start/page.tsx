import {
	Li,
	P,
	Section,
	SectionHeading,
	SubSection,
	UL,
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
				<UL>
					<Li>
						Often requires a sponsor (employer, university, or family)
						or significant funds.
					</Li>
					<Li>
						Strict eligibility: financial proof, documents, background
						checks.
					</Li>
					<Li>Processing can take weeks or months.</Li>
					<Li>
						If approved, a residence permit is issued for a set period
						of time.
					</Li>
					<Li>
						If denied, you are still free to explore other visa
						options.
					</Li>
				</UL>
			</SubSection>
			<SubSection title='Tourist Visa'>
				<UL>
					<Li>
						There are lots of places where American citizens can get
						lengthy tourist visas either immediately or very quickly.
					</Li>
					<Li>
						Many work or study visas have to be applied for FROM your
						home country.
					</Li>
					<Li>
						May also affect your ability to apply for asylum in your
						target country.
					</Li>
				</UL>
			</SubSection>
			<SubSection title='Asylum'>
				<UL>
					<Li>
						Only for people with a well-founded fear of persecution
						(e.g. political opinion, religion, race, sexuality, social
						group).
					</Li>
					<Li>
						Must usually apply on arrival in the country of refuge.
					</Li>
					<Li>
						Free to apply; temporary housing, food, and medical
						support are often provided during the process.
					</Li>
					<Li>
						If denied, <strong>possible entry bans</strong> or forced
						return will be implemented by the local goverment.
					</Li>
				</UL>
			</SubSection>
		</Section>
	)
}

export default StartPage
